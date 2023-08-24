import ExerciceForm from "./ExerciceForm";
import {useEffect, useState} from "react";
import ExerciceField from "./Exercice";
import { LanguageForm } from './LanguageForm';

/*
    [Done]-1. Create a form with a select input to choose the type of classes
    [Done]-2. Call the api and render an exercice
    [Done]-3. Let the user respond correctly or not and show the result
    [Done]-4. Let the user change language
    [Done]-5. Let the user ask for a new exercice in a different type of classes
*/

export default function Procyan() {
    
    let defaultUnitId = 126;
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

    const langDropdown = <LanguageForm handlemode = {0} />;

    //Only show the second dropdown if we have at least 2 exercices
    const secondDropdown = exerciceList.length > 1 ? <ExerciceForm unitId={exerciceList[exerciceList.length-1].unitId} onUpdateUnitId={addExercice} /> : null;
    
    //<li> is the Dropdown list
    //{listItems} is the resulting Content
    return (
        <>
            <ul>
                {langDropdown}

                <li><ExerciceForm unitId={exerciceList[exerciceList.length-1]?.unitId || defaultUnitId} onUpdateUnitId={addExercice} />
                </li>

                {listItems}
                {secondDropdown}
            </ul>
        </>
    );
}
