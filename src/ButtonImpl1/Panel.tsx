import React from 'react';
import { Button1 } from './Button1';
import { Button2 } from './Button2';

export function Panel1() {
    return (
        <>
            <h1>通过模板方法模式实现</h1>
            <Button1 buttonText={'点击下载'}/>
            <Button2 buttonText={'点击下载'}/>
        </>
    );
}
