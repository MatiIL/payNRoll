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
exports.TeamResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const teams_schema_1 = require("../schemas/teams.schema");
const teams_service_1 = require("../services/teams.service");
const create_team_input_1 = require("../inputs/create-team.input");
let TeamResolver = class TeamResolver {
    constructor(teamService) {
        this.teamService = teamService;
    }
    async findAllTeams() {
        return this.teamService.findAllTeams();
    }
    async findTeam(name) {
        return this.teamService.teamByName(name);
    }
    async addNewTeam(team) {
        return this.teamService.createTeam(team);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [teams_schema_1.Team]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "findAllTeams", null);
__decorate([
    (0, graphql_1.Query)(() => teams_schema_1.Team, { nullable: true }),
    __param(0, (0, graphql_1.Args)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "findTeam", null);
__decorate([
    (0, graphql_1.Mutation)(() => teams_schema_1.Team),
    __param(0, (0, graphql_1.Args)("team")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_input_1.CreateTeamInput]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "addNewTeam", null);
TeamResolver = __decorate([
    (0, graphql_1.Resolver)(() => teams_schema_1.Team),
    __metadata("design:paramtypes", [teams_service_1.TeamService])
], TeamResolver);
exports.TeamResolver = TeamResolver;
//# sourceMappingURL=teams.resolver.js.map