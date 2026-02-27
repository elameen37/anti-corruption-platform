import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IntelligenceService } from './intelligence.service';

@Controller('intelligence')
export class IntelligenceController {
    constructor(private readonly intelligenceService: IntelligenceService) { }

    @UseGuards(JwtAuthGuard)
    @Get('dashboard')
    @HttpCode(HttpStatus.OK)
    getDashboardData() {
        return this.intelligenceService.getDashboardData();
    }

    @UseGuards(JwtAuthGuard)
    @Post('query')
    @HttpCode(HttpStatus.OK)
    queryIntelligence(@Body() query: any) {
        // For now, returns the same dashboard data
        return this.intelligenceService.getDashboardData();
    }
}
