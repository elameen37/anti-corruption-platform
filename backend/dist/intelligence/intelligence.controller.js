"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligenceController = void 0;
const common_1 = require("@nestjs/common");
let IntelligenceController = class IntelligenceController {
    queryIntelligence(query) {
        return {
            status: 'success',
            data: {
                activeIntercepts: 12,
                pendingNominations: 47,
                systemIntegrity: 100,
                activeSessions: 342,
                recentAuditLogs: [
                    { time: '10:42:01Z', event: 'OIDC Token Exchanged via hardware-key (YubiKey 5 NFC)', actor: 'ACTOR: 9812-B' },
                    { time: '10:38:15Z', event: 'Vault Access Requested: Dossier [CLASSIFIED]', actor: 'ACTOR: 4410-X' },
                ]
            },
            meta: {
                classification: 'SECRET // NOFORN',
                timestamp: new Date().toISOString()
            }
        };
    }
};
exports.IntelligenceController = IntelligenceController;
__decorate([
    (0, common_1.Post)('query'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IntelligenceController.prototype, "queryIntelligence", null);
exports.IntelligenceController = IntelligenceController = __decorate([
    (0, common_1.Controller)('intelligence')
], IntelligenceController);
//# sourceMappingURL=intelligence.controller.js.map