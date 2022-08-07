import { Justification, SourceLocation } from 'tutch';
import { Response } from './message';
export * from './message';

/**
 * Takes as input a `url` of the Tutch webworker file and two callbacks.
 *
 * The `onSuccess` callback is called upon successful parse and check. This
 * callback will be called even if there are unjustified propositions!
 *
 * The `onError` callback is called only for syntax or type errors.
 *
 * @returns A function that can be called to request that a file be checked.
 *
 * @remarks There will _not_, in general, be a call to `onSuccess` or
 * `onError` for every request! When a new request is made, old requests
 * are invalidated. This means that you will only get a response if it is
 * for the _most recent_ request. You'll never recieve a callback for an
 * outdated `text`.
 */
export default function makeTutchWorker(options: {
  url: string;
  onSuccess: (justs: Justification[]) => void;
  onError: (errorMessage: string, loc: SourceLocation | null) => void;
}): (text: string) => void {
  const { url, onSuccess, onError } = options;
  const worker: Worker = new Worker(url);
  let sequenceNumber = 0;

  worker.onmessage = ({ data }) => {
    const response: Response = data;
    if (response.sequenceNumber !== sequenceNumber) return; // Ignore out-of-sequence messages
    if (response.type === 'Success') {
      onSuccess(response.justifications);
    } else {
      onError(response.errorMessage, response.loc);
    }
  };

  worker.onerror = (err) => {
    onError(`There was an unexpected error with Tutch: ${JSON.stringify(err)}`, null);
  };

  return (text) => {
    sequenceNumber += 1;
    worker.postMessage({ text, sequenceNumber });
  };
}
