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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateTeamInput = class CreateTeamInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    __metadata("design:type", String)
], CreateTeamInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    __metadata("design:type", String)
], CreateTeamInput.prototype, "manager_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    __metadata("design:type", Number)
], CreateTeamInput.prototype, "nextYearBudget", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PlayerInput], {}),
    __metadata("design:type", Array)
], CreateTeamInput.prototype, "currentRoster", void 0);
__decorate([
    (0, graphql_1.Field)(() => [[PlayerInput]], {}),
    __metadata("design:type", Array)
], CreateTeamInput.prototype, "prevRosters", void 0);
__decorate([
    (0, graphql_1.Field)(() => [DraftRecordInput], {}),
    __metadata("design:type", Array)
], CreateTeamInput.prototype, "draftRecord", void 0);
CreateTeamInput = __decorate([
    (0, graphql_1.InputType)()
], CreateTeamInput);
exports.CreateTeamInput = CreateTeamInput;
let PlayerInput = class PlayerInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    __metadata("design:type", String)
], PlayerInput.prototype, "player", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    __metadata("design:type", Number)
], PlayerInput.prototype, "purchasePrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    __metadata("design:type", Number)
], PlayerInput.prototype, "keeperStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    __metadata("design:type", Number)
], PlayerInput.prototype, "YOS", void 0);
PlayerInput = __decorate([
    (0, graphql_1.InputType)()
], PlayerInput);
let DraftRecordInput = class DraftRecordInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    __metadata("design:type", Number)
], DraftRecordInput.prototype, "season", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    __metadata("design:type", Number)
], DraftRecordInput.prototype, "draftPosition", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {}),
    __metadata("design:type", String)
], DraftRecordInput.prototype, "playerDrafted", void 0);
DraftRecordInput = __decorate([
    (0, graphql_1.InputType)()
], DraftRecordInput);
//# sourceMappingURL=create-team.input.js.map