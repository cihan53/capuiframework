import React from"react";import{observer}from"mobx-react/index";import{Xtypes}from"../../../Initialization";import Utils from"./Utils";const CreateComponent=observer(a=>{let b=a;b.key=Utils.ShortId.generate();const c=Xtypes[a.xtype];return React.createElement(c,b)});export default CreateComponent;