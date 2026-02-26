export declare class IntelligenceController {
    queryIntelligence(query: any): {
        status: string;
        data: {
            activeIntercepts: number;
            pendingNominations: number;
            systemIntegrity: number;
            activeSessions: number;
            recentAuditLogs: {
                time: string;
                event: string;
                actor: string;
            }[];
        };
        meta: {
            classification: string;
            timestamp: string;
        };
    };
}
