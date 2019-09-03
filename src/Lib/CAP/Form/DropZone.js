/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React ,{useCallback}from 'react';
import {useDropzone} from 'react-dropzone';
import Utils from "../Utils/Utils";

function Dropzone(props) {

    let _acceptedFiles= props.acceptedFiles || null;
    const maxSize = 1048576 * 100; //100MB
    const maxFiles = 5;

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        _acceptedFiles=null;
        props.onDrop(acceptedFiles)
    }, [])


    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
        // Disable click and keydown behavior
        onDrop,
        minSize: 0,
        maxSize:maxSize,
        maxFiles:maxFiles,
        noClick: true,
        noKeyboard: true,
        //accept:"application/zip, application/x-bzip, application/x-bzip2"
    });

    const files = ( _acceptedFiles || acceptedFiles  ).map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    /**
     * seçilen dosya listesi
     * @param files
     * @returns {*}
     */
    const fileList=files=>{
       return <aside>
            <h4>{Utils.Translate('Seçilen dosyalar')}</h4>
            <ul>{files}</ul>
        </aside>
    }

    return (
        <div className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>{props.dragtext}</p>
                <button type="button" onClick={open}> {props.dialogbuttontext} </button>
            </div>
            {fileList(files)}
        </div>
    );
}

// Set default props
Dropzone.defaultProps = {
    dragtext: Utils.Translate('Bir veya birden fazla dosya sürükleyip bırakın'),
    dialogbuttontext: Utils.Translate('Dosya seç')
};

export default Dropzone;
