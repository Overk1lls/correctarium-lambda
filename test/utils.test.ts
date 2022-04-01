import { hrsToMs, calculateDate, processText, naiveRound } from '../src/lib/utils';

describe('Utils Test', () => {
    it('1 hour into 3 600 000 ms', () => {
        const ms = hrsToMs(1);
        expect(ms).toBe(3600000);
    });

    it('Should return proper date', () => {
        const iDate = new Date(2021, 12, 1, 13);
        const calcDate = calculateDate(8, 10, 19, iDate);
        const expDate = new Date(2021, 12, 3, 18).toLocaleString();

        expect(calcDate).toEqual(expDate);
    });

    it('Process short russian text with non-doc type', () => {
        const text = 'привет';
        const iDate = new Date(2021, 12, 1, 14);
        const res = processText(text, 'type', iDate);
        const time = 1;

        const expectedRes = {
            cost: 50,
            time: time + ' hours',
            whenReady: calculateDate(time, 10, 19, iDate)
        };

        expect(res).toEqual(expectedRes);
    });

    it('Process long russian text with non-doc type', () => {
        const text = 'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники.';

        const iDate = new Date(2021, 12, 1, 14);
        const res = processText(text, 'type', iDate);
        const time = 1.76;

        const expectedRes = {
            cost: 77.22,
            time: time + ' hours',
            whenReady: calculateDate(time, 10, 19, iDate)
        };

        expect(res).toEqual(expectedRes);
    });

    it('Process long russian text with doc type', () => {
        const text = 'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники. ' +
            'Эта книга адресована всем, кто изучает русский язык. ' +
            'Но состоит она не из правил, упражнений и учебных текстов. ' +
            'Для этого созданы другие замечательные учебники.';

        const iDate = new Date(2021, 12, 1, 14);
        const res = processText(text, 'doc', iDate);
        const time = 1.47;

        const expectedRes = {
            cost: 64.35,
            time: time + ' hours',
            whenReady: calculateDate(time, 10, 19, iDate)
        };

        expect(res).toEqual(expectedRes);
    });

    it('Process short english text with non-doc type', () => {
        const text = 'hello';
        const iDate = new Date(2021, 12, 1, 14);
        const res = processText(text, 'type', iDate);
        const time = 1;

        const expectedRes = {
            cost: 50,
            time: time + ' hours',
            whenReady: calculateDate(time, 10, 19, iDate)
        };

        expect(res).toEqual(expectedRes);
    });

    it('Process long english text with non-doc type', () => {
        const text = 'Return value: It returns the number or string rounded up to the specified' +
            'places after the decimal. If the specified value is greater than the number' +
            'of digits after decimal in the actual string then the resulting value is padded' +
            'with 0 to maintain the number of digits after decimal in the final output.' +
            'Return value: It returns the number or string rounded up to the specified places' +
            'after the decimal. If the specified value is greater than the number of digits' +
            'after decimal in the actual string then the resulting value is padded with 0' +
            'to maintain the number of digits after decimal in the final output. Return value:' +
            'It returns the number or string rounded up to the specified places after' +
            'the decimal. If the specified value is greater than the number of digits after' +
            'decimal in the actual string then the resulting value is padded with 0' +
            'to maintain the number of digits after decimal in the final output.';
        const iDate = new Date(2021, 12, 1, 14);
        const res = processText(text, 'type', iDate);
        const time = 3.85;

        const expectedRes = {
            cost: 130.03,
            time: time + ' hours',
            whenReady: calculateDate(time, 10, 19, iDate)
        };

        expect(res).toEqual(expectedRes);
    });

    it('Process long english text with doc type', () => {
        const text = 'Return value: It returns the number or string rounded up to the specified' +
            'places after the decimal. If the specified value is greater than the number' +
            'of digits after decimal in the actual string then the resulting value is padded' +
            'with 0 to maintain the number of digits after decimal in the final output.' +
            'Return value: It returns the number or string rounded up to the specified places' +
            'after the decimal. If the specified value is greater than the number of digits' +
            'after decimal in the actual string then the resulting value is padded with 0' +
            'to maintain the number of digits after decimal in the final output. Return value:' +
            'It returns the number or string rounded up to the specified places after' +
            'the decimal. If the specified value is greater than the number of digits after' +
            'decimal in the actual string then the resulting value is padded with 0' +
            'to maintain the number of digits after decimal in the final output.';
        const iDate = new Date(2021, 12, 1, 14);
        const res = processText(text, 'doc', iDate);
        const time = 3.21;

        const expectedRes = {
            cost: 108.36,
            time: time + ' hours',
            whenReady: calculateDate(time, 10, 19, iDate)
        };

        expect(res).toEqual(expectedRes);
    });

    it('Naive Round Test', () => {
        const num = naiveRound(1.7234324, 2);
        const num2 = naiveRound(1.7234324, 3);
        const num3 = naiveRound(1.7234724, 4);

        expect(num).toBe(1.72);
        expect(num2).toBe(1.723);
        expect(num3).toBe(1.7235);
    });
});
