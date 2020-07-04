import React, { useEffect, useState } from 'react';
import { bridge, DownloadProgress } from '../../common/bridge';
import { getButtonText } from '../../common/util';
import { ButtonProps } from '../../ButtonImpl1/AbstractButton';

/**
 * 高阶函数组件
 */
export function getButton(Button: any) {
    return function (props: ButtonProps) {
        // props
        const { buttonText: dataBtnText } = props;
        // 状态
        const [{ buttonText: dynamicBtnText, downloadProgress, downloadStatus }, refreshState] = useState({
            downloadStatus: DownloadProgress.UNKNOWN,
            downloadProgress: 0,
            buttonText: getButtonText(DownloadProgress.UNKNOWN)
        });
        const onClick = () => bridge.doAction();

        useEffect(() => {
            bridge.addProgressListener((progress, status) => {
                refreshState({
                    downloadStatus: status,
                    downloadProgress: progress,
                    buttonText: getButtonText(status, progress)
                });
            });
        }, []);

        return (
            <Button
                onClick={onClick}
                downloadProgress={downloadProgress}
                downloadStatus={downloadStatus}
                buttonText={dynamicBtnText || dataBtnText}
            />
        );
    };
}
