import {useState} from "react";
import Latex from "react-latex";

import * as React from 'react';
import { Button } from '@mozilla/lilypad-ui';
import '@mozilla/lilypad-ui/dist/styles/theme.scss'; // Import the Lilypad CSS

export default function ExerciceField({UnitId, uuid}){
    const [exercice, setExercice] = useState(undefined);
    const [translationCode, setTranslationCode] = useState(navigator.language.split('-')[0]);

    async function callAPI(currentUnitId, currentUUID = undefined, fake = true) {

        if(fake){
            await new Promise(r => setTimeout(r, 1000));
            return {
                "translationCode": "es",
                "problemType": {
                    "code": "multiple",
                    "value": "객관식"
                },
                "problem": "Encuentra cuántos enteros no negativos hay en total entre las siguientes listas de números.\n$\\displaystyle 1,\\ -5,\\ -\\frac{3}{5},\\ -2,\\ \\frac{1}{4},\\ -\\frac{5}{2}$",
                "choiceList": [
                    "$0$",
                    "$5$",
                    "$3$",
                    "$1$",
                    "$2$"
                ],
                "drawUseProblem": false,
                "drawImageByteProblem": null,
                "explanation": "(A) los enteros no negativos son ${1} \\Longrightarrow 1$.",
                "drawUseExpl": false,
                "drawImageByteExpl": null,
                "answerResult": {
                    "result": {
                        "code": "READY",
                        "value": "풀기 전"
                    },
                    "correctValue": null,
                    "inputAnswer": null,
                    "sec": null
                },
                "uuid": "20230803220447-e05106e5-7c76-441d-be3b-f32973cc3916"
            }
        }

        const headers = new Headers();
        headers.append("x-request-to", "DKDNidkwinDKSNdiwnd")
        //13.209.103.192:9901   ---   https://api-service.solve-mate.com/"
        const baseUrl = "http://api-service.solve-mate.com/"
        const createPostPath = `v1/api/solve/sample/${currentUnitId}`
        const recallGetPath = `v2/api/solve/sample/${currentUUID}`
        let query, method
        if(currentUUID === undefined){
            query = new URL(baseUrl+ createPostPath);
            method = "POST"
        }
        else{
            query = new URL(baseUrl+ recallGetPath);
            method = "GET"
        }
        query.searchParams.append("translationCode", translationCode);
        const response = await fetch(query, {method, headers, mode: 'no-cors'});
        const data = await response.json();
        return data;
    }

    function initExercice(){
        if(exercice !== undefined) return;
        callAPI(UnitId, uuid).then((data) => {
            console.log(data)
            setExercice(data)
        })
    }

    const handleClick = () => {
        // Perform desired action here!
    }
    initExercice()
    return (
        <>
            {exercice === undefined ? <p>Loading..</p> :
                <div
                    /*
                        This section contains the PROBLEM and the EXPLAINATION
                    */
                    //This will set the Style dialog background, NOT the webpage!
                    style={{
                        background: '#ffffff',
                        padding: '20px',
                        margin: '10px',
                        borderRadius: '20px',
                        boxShadow: '0px 2px 5px #265f8e50',
                        fontSize: '16px'
                    }}
                >
                    <p><h3><Latex displayMode={true}>{exercice.problem}</Latex></h3></p>
                    <p><Latex displayMode={true}>{exercice.explanation}</Latex></p>
                </div>
            }

            <ul >
                {exercice && exercice.choiceList.map((choice, index) =>
                    /*
                        This section contains the ANSWER BUTTONS
                        (Note: I separate the script to have the answers outside the main BOX)
                    */
                    <li key={index}
                        style={{
                            margin: "5px 0" ,
                            //Do not add more "styles" here, lilypad uses it's own parameters
                        }}>
                        <Button
                            category="primary_solid"
                            onClick={function handleClick(choice, index) { }}
                            //text={<Latex displayMode={true}>{choice}</Latex>} //Original
                            text={<Latex displayMode={false}>{String.fromCharCode(65 + index) + ". " + choice}</Latex>} //+Alphabet Value
                            type="button"
                            size="small"
                            
                        />
                    </li>
                )}
            </ul>
        </>
    )
}