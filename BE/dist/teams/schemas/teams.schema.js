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
exports.TeamSchema = exports.DraftRecord = exports.PlayerInfo = exports.Team = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
const mongoose_2 = require("mongoose");
let Team = class Team extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, auto: true }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Team.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Team.prototype, "manager_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Team.prototype, "nextYearBudget", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PlayerInfo]),
    (0, mongoose_1.Prop)({
        required: false,
        type: [
            {
                _id: false,
                player: String,
                purchasePrice: Number,
                keeperStatus: Number,
                YOS: Number,
            },
        ],
    }),
    __metadata("design:type", Array)
], Team.prototype, "currentRoster", void 0);
__decorate([
    (0, graphql_1.Field)(() => [[String]]),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Team.prototype, "prevRosters", void 0);
__decorate([
    (0, graphql_1.Field)(() => [DraftRecord]),
    (0, mongoose_1.Prop)({
        required: false,
        type: [
            {
                _id: false,
                season: Number,
                draftPosition: Number,
                playerDrafted: String,
            },
        ],
    }),
    __metadata("design:type", Array)
], Team.prototype, "draftRecord", void 0);
Team = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)({ collection: 'teams' })
], Team);
exports.Team = Team;
let PlayerInfo = class PlayerInfo {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PlayerInfo.prototype, "player", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PlayerInfo.prototype, "purchasePrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PlayerInfo.prototype, "keeperStatus", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PlayerInfo.prototype, "YOS", void 0);
PlayerInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PlayerInfo);
exports.PlayerInfo = PlayerInfo;
let DraftRecord = class DraftRecord {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DraftRecord.prototype, "season", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DraftRecord.prototype, "draftPosition", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DraftRecord.prototype, "playerDrafted", void 0);
DraftRecord = __decorate([
    (0, graphql_1.ObjectType)()
], DraftRecord);
exports.DraftRecord = DraftRecord;
exports.TeamSchema = mongoose_1.SchemaFactory.createForClass(Team);
//# sourceMappingURL=teams.schema.js.map