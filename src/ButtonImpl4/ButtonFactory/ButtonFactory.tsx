import React, { useEffect, useState } from 'react';
import { bridge, DownloadProgress } from '../../common/bridge';
import { getButtonText } from '../../common/util';
import { ButtonProps, InnerButtonProps } from '../../ButtonImpl1/AbstractButton';

/**
 * 自定义hooks
 */
export function useButtonProps(props: ButtonProps): InnerButtonProps {
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

    return {
        onClick,
        downloadStatus,
        downloadProgress,
        buttonText: dynamicBtnText || dataBtnText
    };
}
