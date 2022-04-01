export const hrsToMs = (hours: number) => hours * 60 * 60 * 1000;

export const naiveRound = (num: number, decimals = 0) => {
    const p = Math.pow(10, decimals);
    return Math.round(num * p) / p;
};

export const calculateDate = (
    time: number,
    workFrom: number,
    workTo: number,
    startDate = new Date()
) => {
    const endDate = new Date(startDate);
    const iHrs = startDate.getHours();

    // how much time is needed
    let timeLeft = Math.round(hrsToMs(time));
    // how much time can you work today
    let curDayTime = Math.round(hrsToMs(workTo) - hrsToMs(iHrs + startDate.getMinutes() / 60));

    // if apply time is later than {workTo}
    if (iHrs >= workTo || iHrs < workFrom) {
        if (iHrs >= workTo) endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(workFrom, 0, 0, 0);
        curDayTime = hrsToMs(workTo - workFrom);
    }

    do {
        // if issued on saturday or sunday (no work days)
        if (endDate.getDay() === 6 || endDate.getDay() === 0) {
            endDate.setDate(endDate.getDate() + (endDate.getDay() === 6 ? 2 : 1));
            endDate.setHours(10, 0, 0, 0);
            curDayTime = hrsToMs(workTo - workFrom);
        }
        // if today is more than enough to finish the work
        if (timeLeft - curDayTime > 0)
            endDate.setTime(endDate.getTime() + curDayTime + hrsToMs(24 - workTo + workFrom));
        else endDate.setTime(endDate.getTime() + timeLeft);

        timeLeft -= curDayTime;
    } while (timeLeft > 0);
    endDate.setMinutes(Math.round(endDate.getMinutes() / 10) * 10, 0);

    return endDate.toLocaleString();
};

export const processText = (text: string, fileType: string, startDate = new Date()) => {
    // time in hours; base is 30 minutes
    let time = 0.5;
    // result cost of the translation
    let cost = 0;

    const defaultTypes = ['doc', 'docx', 'rft'];

    // if text is written in russian
    if (/[а-я]/i.test(text)) {
        cost += text.length * 0.05;
        time += text.length / 1333;
    } else {
        cost += text.length * 0.12;
        time += text.length / 333;
    }

    // if file type is not one of the default types
    // then add +20% to the price and time
    if (!defaultTypes.includes(fileType)) {
        cost += cost * 0.2;
        time += time * 0.2;
    }

    // if cost is less than 50, then cost is 50
    if (cost < 50) cost = 50;
    // same for the time
    if (time < 1) time = 1;

    cost = naiveRound(cost, 2);
    time = naiveRound(time, 2);

    return {
        cost,
        time: time + ' hours',
        whenReady: calculateDate(time, 10, 19, startDate)
    };
};
