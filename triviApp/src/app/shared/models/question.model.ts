export class Question{
    id:number;
    introduction:string;
    question:string;
    answer:string;
    correctAnswer:string;
    possibleAnswer:[{
        option:string;
        description:string;
    }]
}