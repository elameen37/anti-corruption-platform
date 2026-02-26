import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IntelligenceModule } from './intelligence/intelligence.module';

@Module({
  imports: [AuthModule, IntelligenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
