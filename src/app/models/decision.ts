export class DecisionHistory {
    constructor(public decisionID: string, public resolutionID: string) {}
}

export class DecisionResolution {
    id: string;
    preDescription: string;
    postDescription: string;
    specialInstructions: string; //might not be used
    
    lawDelta: number = 0;
    tradeDelta: number = 0;
    farmingDelta: number = 0;
    loreDelta: number = 0;
    societyDelta: number = 0;
    treasuryDelta: number = 0;
    
    lawRequirement: number = -10;
    tradeRequirement: number = 0;
    farmingRequirement: number = 0;
    loreRequirement: number = 0;
    societyRequirement: number = 0;
    treasuryRequirement: number = 0;
    
    allowsExpansionPhase: boolean = true;
    allowsRecruitmentPhase: boolean = true;
}

export class DailyDecision {
    id: string;
    title: string;
    description: string;
    requirements: DecisionHistory;
    resolutions: DecisionResolution[] = [];
}