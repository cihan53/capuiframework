import React, {useState} from "react";
import Button from "../Form/Button";

import "../../../Assets/Panel/Wizard.scss"
import Panel from "./Panel";
import {ClassNames} from "../../../index";

/**
 *
 * @param indx
 * @param length
 */
const getNavStyles = (indx, length) => {
    let styles = [];
    for (let i = 0; i < length; i++) {
        if (i < indx) {
            styles.push("done")
        } else if (i === indx) {
            styles.push('doing')
        } else {
            styles.push('todo')
        }
    }
    return styles
}
/**
 *
 * @param indx
 * @param length
 */
const getButtonState = (indx, length) => {
    if (indx > 0 && indx < length - 1) {
        return {
            showPreviousBtn: true,
            showNextBtn: true
        }
    } else if (indx === 0) {
        return {
            showPreviousBtn: false,
            showNextBtn: true
        }
    } else {
        return {
            showPreviousBtn: true,
            showNextBtn: false
        }
    }
}

export default function Wizard(props) {
    const [stylesState, setStyles] = useState(getNavStyles(0, props.steps.length));
    const [compState, setComp] = useState(0);
    const [buttonsState, setButtons] = useState(getButtonState(0, props.steps.length));

    function setStepState(indx) {
        setStyles(getNavStyles(indx, props.steps.length));
        setComp(indx < props.steps.length ? indx : compState);
        setButtons(getButtonState(indx, props.steps.length));
    }

    const next = () => setStepState(compState + 1);
    const previous = () => setStepState(compState - 1);
    const handleKeyDown = (evt) => evt.which === 13 ? next(props.steps.length) : {};
    const handleOnClick = (evt) => {
        if (evt.currentTarget.value == props.steps.length - 1 && compState === props.steps.length - 1) {
            setStepState(props.steps.length)
        } else {
            setStepState(evt.currentTarget.value);
        }
    }

    const renderSteps = () =>
        props.steps.map((s, i) => {
            return <li
                className={ClassNames('panel-wizard-' + stylesState[i], props.steps[i].navItemCls)}
                onClick={handleOnClick}
                key={i}
                value={i}
            >
                {props.steps[i].iconCls ? <i className={props.steps[i].iconCls}></i>:"" }
                <em>{i + 1}</em>
                <div>{props.steps[i].name}</div>
            </li>
        });

    return (
        <div className={ClassNames('panel-wizard-container', props.containerClass)} onKeyDown={handleKeyDown}>
                <ol className={"panel-wizard"}>{renderSteps()}</ol>
                <div className={props.contentWrapClass}>
                    {props.steps[compState].component}
                </div>
                <div className={"btns"} style={props.showNavigation ? {} : {display: 'none'}}>
                    <Button
                        onClick={previous}
                        className={"prev-btn"}
                        style={buttonsState.showPreviousBtn ? {} : {display: 'none'}}
                    >{CAP.__t("Önceki")}</Button>

                    <Button
                        onClick={next}
                        className={"next-btn"}
                        style={buttonsState.showNextBtn ? {} : {display: 'none'}}
                    >{CAP.__t("Sonraki")}</Button>
                </div>
        </div>
    )

}

Wizard.defaultProps = {
    showNavigation: true,
    containerClass: "",
    contentWrapClass: "wrap"
}