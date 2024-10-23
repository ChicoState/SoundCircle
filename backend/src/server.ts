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
import { createNewUserProfile, findUserByEmail } from './Models/Users/user.model';

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

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  async (req: Request, res: Response) => {
    const user = req.user as GoogleUser;

    try {
      // Set the access token in an HTTP-only cookie
      res.cookie('access_token', user.accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        maxAge: 5 * 24 * 60 * 60 * 1000,
      });

      const email = user.profile.emails?.[0]?.value;
      if (email) {
        const userExists = await findUserByEmail(email);

        if (!userExists.length) {
          // User doesn't exist, create a new user
          await createNewUserProfile(email);
          console.log('User created successfully.');
        } else {
          console.log("User already exists.");
        }
      }

      // Redirect to frontend after user creation
      if (!res.headersSent) {
        res.redirect('http://localhost:3000/');
      }
    } catch (error) {
      console.error('Error handling Google callback: ', error);
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    }
  }
);

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
