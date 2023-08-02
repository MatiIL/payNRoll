/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Team extends Document {
    _id: string;
    name: string;
    manager_id: string;
    nextYearBudget: number;
    currentRoster: PlayerInfo[];
    prevRosters: string[][];
    draftRecord: DraftRecord[];
}
export declare class PlayerInfo {
    player: string;
    purchasePrice: number;
    keeperStatus: number;
    YOS: number;
}
export declare class DraftRecord {
    season: number;
    draftPosition: number;
    playerDrafted: string;
}
export declare const TeamSchema: MongooseSchema<Team, import("mongoose").Model<Team, any, any, any, Document<unknown, any, Team> & Omit<Team & Required<{
    _id: string;
}>, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Team, Document<unknown, {}, import("mongoose").FlatRecord<Team>> & Omit<import("mongoose").FlatRecord<Team> & Required<{
    _id: string;
}>, never>>;
