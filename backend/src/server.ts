import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../build/routes';
import { findUserByEmail } from './Models/Users/user.model';

import 'express-session';

declare module 'express-session' {
  interface Session {
    needsSetup?: boolean;
    uid?: number;
  }
}

// Define custom types
interface GoogleUser {
  profile: GoogleProfile;
  accessToken: string;
  refreshToken: string;
  date: number;
}

declare global {
  namespace Express {
    interface User extends GoogleUser {}
  }
}

// Load environment variables
dotenv.config({ path: '.env' });
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT = '8080' } = process.env;

// Express App Setup
const app = express();
const buildPath = path.join(__dirname, '../../../../frontend/build');

// Middleware setup
app.use(express.static(buildPath));
app.use(cookieParser('abcdefg'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 24 * 60 * 60 * 1000, sameSite: 'strict' }, // 5 days
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

// Passport Google Strategy setup
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const user: GoogleUser = {
        profile,
        accessToken,
        refreshToken,
        date: Date.now(),
      };
      return done(null, user);
    }
  )
);

// Serialize and deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

app.get('/login', (_req: Request, res: Response) => {
  res.redirect('/auth/google');
});

// Google OAuth routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

const ensureUserSetupAccess = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const loggedInUserID = req.user.profile.id; // User ID from the authenticated session (from Passport)
  console.log(req)
  // Compare URL param userID with logged-in user's ID
  if ("3" !== loggedInUserID) {
    return res.status(403).send('Forbidden: You cannot access this page.');
  }

  next(); // Proceed to the route handler if IDs match
};



app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  async (req: Request, res: Response) => {
    const user = req.user as GoogleUser;
    const email = user.profile.emails?.[0]?.value;

    try {
      res.cookie('access_token', user.accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        maxAge: 5 * 24 * 60 * 60 * 1000,
      });

      if (email) {
        const userExists = await findUserByEmail(email);
        if (!userExists.length) {
          req.session.needsSetup = true; // Flag to indicate setup is required
          res.redirect(`http://localhost:3000/usersetup?email=${encodeURIComponent(email)}`);
        } else {
          req.session.needsSetup = false;
          console.log("User Exists:", userExists[0]?.id);
          req.session.uid = userExists[0]?.id; 
          res.redirect('http://localhost:3000/');
        }
      }
    } catch (error) {
      console.error('Error handling Google callback: ', error);
      res.status(500).send('Internal Server Error');
    }
  }
);



app.get('/usersetup/', ensureUserSetupAccess, (req: Request, res: Response) => {
  res.send(`User setup page for ${req.user?.profile?.displayName}`);
});



// Error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send(err.message);
});

// Swagger documentation
app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});

// Register tsoa routes
RegisterRoutes(app);

// Start server
app.listen(parseInt(PORT), () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// Expose the user id
app.get('/api/uid', (req: Request, res: Response) => {
  try {
    const user = req.session.uid;
    console.log("Request for uid:", user);
    if (user) {
      return res.status(200).json({uid: user});
    } else {
      return res.status(404).json({message: 'User ID not found'});
    }
  } catch (error) {
    console.error("Error in /api/uid:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});