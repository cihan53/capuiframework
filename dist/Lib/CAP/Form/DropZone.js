/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Utils from "../Utils/Utils";

function Dropzone(props) {
  let _acceptedFiles = props.acceptedFiles || null;

  const maxSize = 1048576 * 100; //100MB

  const maxFiles = 5;
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    _acceptedFiles = null;
    props.onDrop(acceptedFiles);
  }, []);
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles
  } = useDropzone({
    // Disable click and keydown behavior
    onDrop,
    minSize: 0,
    maxSize: maxSize,
    maxFiles: maxFiles,
    noClick: true,
    noKeyboard: true //accept:"application/zip, application/x-bzip, application/x-bzip2"

  });

  const files = (_acceptedFiles || acceptedFiles).map(file => React.createElement("li", {
    key: file.path
  }, file.path, " - ", file.size, " bytes"));
  /**
   * seçilen dosya listesi
   * @param files
   * @returns {*}
   */


  const fileList = files => {
    return React.createElement("aside", null, React.createElement("h4", null, Utils.Translate('Seçilen dosyalar')), React.createElement("ul", null, files));
  };

  return React.createElement("div", {
    className: "container"
  }, React.createElement("div", getRootProps({
    className: 'dropzone'
  }), React.createElement("input", getInputProps()), React.createElement("p", null, props.dragtext), React.createElement("button", {
    type: "button",
    onClick: open
  }, " ", props.dialogbuttontext, " ")), fileList(files));
} // Set default props


Dropzone.defaultProps = {
  dragtext: Utils.Translate('Bir veya birden fazla dosya sürükleyip bırakın'),
  dialogbuttontext: Utils.Translate('Dosya seç')
};
export default Dropzone;