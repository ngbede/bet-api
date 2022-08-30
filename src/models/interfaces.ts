interface Game {
    teams?: string,
    description?: string,
    isSuspended?: boolean,
    odds?: number | null,
    pick?: string,
    status?: string,
}

interface Odds {
    totalOdds?: string | null,
    maxBonus?: string | null,
    potentialWin?: string | null,
}

interface ErrorObject {
    message?: string,
    code: number,
    error?: string | Object | Array<any>
}
