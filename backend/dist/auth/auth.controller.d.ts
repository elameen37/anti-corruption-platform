export declare class AuthController {
    exchangeToken(body: any): {
        status: string;
        message: string;
        access_token: string;
        expires_in: number;
        clearance_level: string;
        agency: string;
    };
}
