import { parse, evaluate } from 'tutch';
import { Request, Response } from './message';

let currentSequenceNumber = -1;
let currentText: string | null = null;
function doWork() {
    if (currentText === null) return;
    const text = currentText;
    currentText = null;

    let response: Response;
    let delay;
    try {
        const ast = parse(text);
        const justifications = evaluate(ast);
        delay = 0;
        response = {
            type: 'Success',
            sequenceNumber: currentSequenceNumber,
            justifications,
        };
    } catch (err) {
        delay = 0;
        if (err.name === 'ParsingError') {
            response = {
                type: 'Error',
                sequenceNumber: currentSequenceNumber,
                errorMessage: `${err}`,
                loc: err.loc,
            };
        } else {
            console.log(err);
            response = {
                type: 'Error',
                sequenceNumber: currentSequenceNumber,
                errorMessage: `Unexpected error, please report: ${err}`,
                loc: null,
            };
        }
    }
    setTimeout(() => postMessage(response), delay);
}

onmessage = function({ data }) {
    const request: Request = data;
    const { text, sequenceNumber } = request;
    if (sequenceNumber > currentSequenceNumber) {
        currentSequenceNumber = sequenceNumber;
        currentText = text;
        setTimeout(doWork);
    }
};
