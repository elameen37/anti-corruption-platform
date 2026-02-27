import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './auth.service';

export const JWT_SECRET = 'SICE-SOVEREIGN-KEY-DO-NOT-USE-IN-PRODUCTION';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        return {
            userId: payload.sub,
            agencyId: payload.agencyId,
            role: payload.role,
            clearanceLevel: payload.clearanceLevel,
            agency: payload.agency,
        };
    }
}
