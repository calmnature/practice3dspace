
type commandHelperStartEvent = {
    numberSteps?: number,
    message?: string,
    noLabel?: boolean,
    infoMessage?: string
};

interface coordinatePosition {
    value: number,
    isAbsolute: boolean,
    reference: 'top' | 'left' | 'bottom' | 'right'
}

//eslint-disable-next-line
type commandHelperEndEvent = {}

//eslint-disable-next-line
type commandHelperWarnEvent = {}

type commandHelperNextEvent = {
    numberSteps?: number,
    message?: string
};


//eslint-disable-next-line
type commandHelperPreviousEvent = {}

type commandHelperDataEvent = {
    id?: string,
    name?: string,
    requestedStep?: any,
    options: commandHelperStartEvent    |
             commandHelperEndEvent      | 
             commandHelperNextEvent     | 
             commandHelperPreviousEvent |
             commandHelperWarnEvent
};
