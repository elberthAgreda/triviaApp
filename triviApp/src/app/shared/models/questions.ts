import {Question} from "./question.model";

export const QUESTIONS:Question[] = [
    {
        id:1,
        introduction:'texto de prueba xxx',
        question:'Cual es la ...',
        answer:null,
        correctAnswer:'A',
        possibleAnswer:[
            {
                option:'A',
                description:'Texto de posible respuesta'
            },
            {
                option:'B',
                description:'Texto de posible respuesta'
            },
            {
                option:'C',
                description:'Texto de posible respuesta'
            }
        ]
    }
];