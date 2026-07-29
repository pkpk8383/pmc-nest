import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Static assets
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/' });

  // Handlebars view engine with layout support
  app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'views', 'layouts'),
      partialsDir: join(__dirname, '..', 'views', 'partials'),
      helpers: {
        eq: (a: string, b: string) => a === b,
        year: () => new Date().getFullYear(),
      },
    }),
  );

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Global template variables
  app.use((req: any, res: any, next: any) => {
    res.locals.currentPath = req.path;
    res.locals.year = new Date().getFullYear();
    next();
  });

  await app.listen(3000);
  console.log(`🚀 PMC NestJS app running on http://localhost:3000`);
}
bootstrap();
