import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// In-memory mock users for SICE prototype
const MOCK_USERS = [
    {
        id: 'agt-001',
        agencyId: 'ICPC-INT-8902',
        passphrase: 'sovereign-key-alpha',
        fullName: 'Director Abubakar Ibrahim',
        role: 'DIRECTOR',
        clearanceLevel: 'TOP_SECRET',
        agency: 'ICPC',
        division: 'Intelligence & Special Operations',
    },
    {
        id: 'agt-002',
        agencyId: 'EFCC-OPS-4410',
        passphrase: 'fortress-echo-bravo',
        fullName: 'Agent Chioma Okafor',
        role: 'SENIOR_ANALYST',
        clearanceLevel: 'SECRET',
        agency: 'EFCC',
        division: 'Financial Crimes Investigation',
    },
    {
        id: 'agt-003',
        agencyId: 'NFIU-CTR-7701',
        passphrase: 'delta-six-gamma',
        fullName: 'Analyst Musa Abdullahi',
        role: 'ANALYST',
        clearanceLevel: 'CONFIDENTIAL',
        agency: 'NFIU',
        division: 'Counter-Terrorism Financing',
    },
];

export interface JwtPayload {
    sub: string;
    agencyId: string;
    role: string;
    clearanceLevel: string;
    agency: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async validateUser(agencyId: string, passphrase: string) {
        const user = MOCK_USERS.find(
            (u) => u.agencyId === agencyId && u.passphrase === passphrase,
        );
        if (!user) {
            return null;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passphrase: _, ...safeUser } = user;
        return safeUser;
    }

    async login(agencyId: string, passphrase: string) {
        const user = await this.validateUser(agencyId, passphrase);
        if (!user) {
            throw new UnauthorizedException(
                'Authentication failed. Invalid Agency ID or Cryptographic Passphrase.',
            );
        }

        const payload: JwtPayload = {
            sub: user.id,
            agencyId: user.agencyId,
            role: user.role,
            clearanceLevel: user.clearanceLevel,
            agency: user.agency,
        };

        return {
            status: 'success',
            message: 'Zero-Trust Authentication successful. Device fingerprinted.',
            access_token: this.jwtService.sign(payload),
            expires_in: 3600,
            user: {
                id: user.id,
                fullName: user.fullName,
                role: user.role,
                clearanceLevel: user.clearanceLevel,
                agency: user.agency,
                division: user.division,
            },
        };
    }

    async getProfile(userId: string) {
        const user = MOCK_USERS.find((u) => u.id === userId);
        if (!user) {
            throw new UnauthorizedException('User not found.');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passphrase: _, ...safeUser } = user;
        return safeUser;
    }
}
