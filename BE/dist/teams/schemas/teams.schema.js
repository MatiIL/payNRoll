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
exports.TeamSchema = exports.Team = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Team = class Team extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Team.prototype, "manager_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Team.prototype, "nextYearBudget", void 0);
__decorate([
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
    __metadata("design:type", Object)
], Team.prototype, "currentRoster", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [[]] }),
    __metadata("design:type", Array)
], Team.prototype, "prevRosters", void 0);
__decorate([
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
    __metadata("design:type", Object)
], Team.prototype, "draftRecord", void 0);
Team = __decorate([
    (0, mongoose_1.Schema)({ collection: 'teams' })
], Team);
exports.Team = Team;
exports.TeamSchema = mongoose_1.SchemaFactory.createForClass(Team);
//# sourceMappingURL=teams.schema.js.map