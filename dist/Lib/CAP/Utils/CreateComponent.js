import React from "react";
import { observer } from "mobx-react/index";
import { Xtypes } from "../../../Initialization";
import Utils from "./Utils";
const CreateComponent = observer(def => {
  let props = def;
  props.key = Utils.ShortId.generate();
  const Cp = Xtypes[def.xtype];
  return React.createElement(Cp, props);
});
export default CreateComponent;