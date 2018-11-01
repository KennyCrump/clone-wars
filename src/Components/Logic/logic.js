const axios = require('axios');


    export function calculateScore (completed){
        let  score = 0
        for(let i = 0; i < completed.length; i++){
            switch(completed[i].difficulty){
                case 1: score += 1; break;
                case 2: score += 3; break;
                case 3: score += 9; break;
                case 4: score += 20; break;
                case 5: score += 40; break;
                case 6: score += 80; break;
                case 7: score += 160; break;
                case 8: score += 320; break;
                case 9: score += 640; break;
                case 10: score += 1000; break;
            }
        }
        return score
    }