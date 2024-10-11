import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../build/routes';

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
    cookie: { maxAge: 5 * 24 * 60 * 60 * 1000 }, // 5 days
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
      const user = {
        profile,
        accessToken,
        refreshToken,
        date: Date.now(),
      };
      console.log(user);
      return done(null, user);
    }
  )
);

// Serialize and deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

app.get('/login', (req: Request, res: Response) => {
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
  (req: Request, res: Response) => {
    const user = req.user as any;
    const accessToken = user.accessToken;

    // Set the access token in an HTTP-only cookie
    res.cookie('access_token', accessToken, {
      httpOnly: false, // Ensures the cookie is only accessible via HTTP(S), not JavaScript
      sameSite: 'lax', // Helps with CSRF protection
      maxAge: 5 * 24 * 60 * 60 * 1000, // Cookie expiry time, here 5 days
    });

    // Redirect to frontend after setting the cookie
    res.redirect('http://localhost:3000/');
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
