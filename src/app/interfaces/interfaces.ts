export interface IExcercise {
    id: string,
    img: string,
    joint: string,
    name: string,
    signal: ISignal,     
    tools: string[],
}

export interface ISignal {
    id: string,
    min: number,
    max: number
}

export interface Signal {
    id: string,
    name: string
}

export interface Tool {
    id: string,
    name: string
}

export interface Joint {
    id: string,
    name: string
}

export interface Filter {
    joint: string,
    tool: string
}


