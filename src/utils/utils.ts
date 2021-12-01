const rus = /[а-я]/i;

const hrsToMs = (hours: number): number => {
    return hours * 60 * 60 * 1000;
}

const calculateDate = (time: number, workFrom: number, workTo: number, iAt: Date): string => {
    const endDate = new Date(iAt);
    const iHrs = iAt.getHours();

    // how much time is needed
    let timeLeft = Math.round(hrsToMs(time));
    // how much time can you work today
    let curDayTime = Math.round(hrsToMs(workTo) - hrsToMs(iHrs + iAt.getMinutes() / 60));

    // if apply time is later than {workTo}
    if (iHrs >= workTo || iHrs < workFrom) {
        if (iHrs >= workTo) endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(workFrom, 0, 0, 0);
        curDayTime = hrsToMs(workTo - workFrom);
    }

    do {
        // if issued on saturday or sunday (no work days)
        if (endDate.getDay() == 6 || endDate.getDay() == 0) {
            endDate.setDate(endDate.getDate() + (endDate.getDay() == 6 ? 2 : 1));
            endDate.setHours(10, 0, 0, 0);
            curDayTime = hrsToMs(workTo - workFrom);
        }
        // if today hours is more than enough to finish the work
        if (timeLeft - curDayTime > 0) endDate.setTime(endDate.getTime() + curDayTime + hrsToMs(24 - workTo + workFrom));
        else endDate.setTime(endDate.getTime() + timeLeft);

        timeLeft -= curDayTime;
    } while (timeLeft > 0);

    endDate.setMinutes(Math.round(endDate.getMinutes() / 10) * 10, 0);

    return endDate.toLocaleString();
};

const processText = (text: string, fileType: string, iAt = new Date()): Object => {
    // time in hours
    let time = 0.5;

    let result = {
        cost: 0,
        time: '',
        whenReady: ''
    };

    // if text in russian
    if (rus.test(text)) {
        result.cost += text.length * 0.05;
        time += text.length / 1333;
    } else {
        result.cost += text.length * 0.12;
        time += text.length / 333;
    }

    // if file type is not one of ['doc', 'docx', 'rft'] 
    // then add +20% to the price and time
    if (fileType !== 'doc' && fileType !== 'docx' && fileType !== 'rtf') {
        result.cost += result.cost * 0.2;
        time += time * 0.2;
    }

    // if cost is less than 50 
    if (result.cost < 50) result.cost = 50;
    if (time < 1) time = 1;

    result.time = time + ' hours';
    result.whenReady = calculateDate(time, 10, 19, iAt);

    return result;
};

export { processText, calculateDate };