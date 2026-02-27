import { Injectable } from '@nestjs/common';

@Injectable()
export class IntelligenceService {
    getDashboardData() {
        return {
            status: 'success',
            data: {
                activeIntercepts: 12,
                pendingNominations: 47,
                systemIntegrity: 100,
                activeSessions: 342,
                threatLevel: 'ELEVATED',
                recentAuditLogs: [
                    {
                        id: 'log-001',
                        time: '2026-02-27T10:42:01Z',
                        event: 'OIDC Token Exchanged via hardware-key (YubiKey 5 NFC)',
                        actor: 'ACTOR: 9812-B',
                        severity: 'INFO',
                    },
                    {
                        id: 'log-002',
                        time: '2026-02-27T10:38:15Z',
                        event: 'Vault Access Requested: Dossier [CLASSIFIED]',
                        actor: 'ACTOR: 4410-X',
                        severity: 'WARNING',
                    },
                    {
                        id: 'log-003',
                        time: '2026-02-27T10:35:02Z',
                        event: 'Geofence Alert: Unauthorized device detected in SCIF Zone Alpha',
                        actor: 'SYSTEM',
                        severity: 'CRITICAL',
                    },
                    {
                        id: 'log-004',
                        time: '2026-02-27T10:30:44Z',
                        event: 'Cross-Agency Intelligence Share: EFCC → NFIU Pipeline Active',
                        actor: 'ACTOR: 7701-M',
                        severity: 'INFO',
                    },
                    {
                        id: 'log-005',
                        time: '2026-02-27T10:28:11Z',
                        event: 'Anomaly Detection: Unusual transaction pattern flagged in Sector 7G',
                        actor: 'AI-ENGINE',
                        severity: 'WARNING',
                    },
                ],
                activeCases: [
                    {
                        id: 'CASE-2026-0847',
                        title: 'Operation Clean Sweep',
                        status: 'ACTIVE',
                        priority: 'HIGH',
                        assignedAgency: 'ICPC',
                        lastUpdate: '2026-02-27T09:15:00Z',
                    },
                    {
                        id: 'CASE-2026-0831',
                        title: 'Project Lantern',
                        status: 'UNDER_REVIEW',
                        priority: 'CRITICAL',
                        assignedAgency: 'EFCC',
                        lastUpdate: '2026-02-27T08:42:00Z',
                    },
                    {
                        id: 'CASE-2026-0819',
                        title: 'Operation Riverwatch',
                        status: 'ACTIVE',
                        priority: 'MEDIUM',
                        assignedAgency: 'NFIU',
                        lastUpdate: '2026-02-26T16:30:00Z',
                    },
                ],
                agencyMetrics: [
                    { agency: 'ICPC', casesResolved: 142, activeInvestigations: 38, complianceScore: 97 },
                    { agency: 'EFCC', casesResolved: 287, activeInvestigations: 61, complianceScore: 94 },
                    { agency: 'NFIU', casesResolved: 98, activeInvestigations: 22, complianceScore: 99 },
                ],
            },
            meta: {
                classification: 'SECRET // NOFORN',
                timestamp: new Date().toISOString(),
            },
        };
    }
}
