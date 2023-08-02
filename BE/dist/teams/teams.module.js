"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const teams_schema_1 = require("./schemas/teams.schema");
const teams_service_1 = require("./services/teams.service");
const teams_resolver_1 = require("./resolvers/teams.resolver");
let TeamsModule = class TeamsModule {
};
TeamsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "teams", schema: teams_schema_1.TeamSchema }
            ]),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
            }),
        ],
        providers: [
            teams_service_1.TeamService,
            teams_resolver_1.TeamResolver
        ]
    })
], TeamsModule);
exports.TeamsModule = TeamsModule;
//# sourceMappingURL=teams.module.js.map