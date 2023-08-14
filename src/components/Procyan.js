import ExerciceForm from "./ExerciceForm";
import {useEffect, useState} from "react";
import ExerciceField from "./Exercice";

/*
    [Done]-1. Create a form with a select input to choose the type of classes
    [Done]-2. Call the api and render an exercice
    3. Let the user respond correctly or not and show the result
    4. Let the user change language
    5. Let the user ask for a new exercice in a different type of classes
*/

export default function Procyan() {
    
    let defaultUnitId = 126;
    //const [translationCode, setTranslationCode] = useState(navigator.language.split('-')[0]);
    const [exerciceList, setExerciceList] = useState([]);

    const listItems = exerciceList.map(exercice => {
        //console.warn(exercice);
        return <li key={exercice.unitId}>
           <ExerciceField UnitId={exercice.unitId}/>
        </li>
    });

    function addExercice(unitId) {
        console.log("---[Add an exercice!]---")
        setExerciceList([...exerciceList, {unitId: unitId, id: exerciceList.length}])
        /*setExerciceList(()=>{
            return [...exerciceList, {unitId: unitId, id: exerciceList.length}];
        })*/
    }
    

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const unitId = urlParams.get("unitId");
        
        if (unitId)
        {
            addExercice(unitId);
        }
    
    }, []);

    //<li> is the Dropdown list
    //{listItems} is the resulting Content
    return (
        <>
            <ul>
                <li><ExerciceForm unitId={exerciceList[exerciceList.length-1]?.unitId || defaultUnitId} onUpdateUnitId={addExercice} />
                </li>

                {listItems}
            </ul>
        </>
    );
}