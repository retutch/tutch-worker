import { SourceLocation, Justification } from 'tutch';

export interface Request {
    text: string;
    sequenceNumber: number;
}

export interface Error {
    type: 'Error';
    sequenceNumber: number;
    errorMessage: string;
    loc: SourceLocation | null;
}

export interface Success {
    type: 'Success';
    sequenceNumber: number;
    justifications: Justification[];
}

export type Response = Error | Success;
