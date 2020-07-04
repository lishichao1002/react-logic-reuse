import React from 'react';
import { ButtonProps } from '../../ButtonImpl1/AbstractButton';
import { DownloadProgress } from '../../common/bridge';
import './index.scss';
import { useButtonProps } from '../ButtonFactory/ButtonFactory';

export function Button2(props: ButtonProps) {
    const { onClick, downloadProgress, downloadStatus, buttonText } = useButtonProps(props);
    return (
        <button
            className="btn32-action"
            onClick={onClick}
        >
            <div className="btn-text">{buttonText}</div>
            {
                /* 下载完成不用加黑色遮罩 */
                (downloadStatus === DownloadProgress.DOWNLOADING || downloadStatus === DownloadProgress.PENDING) ?
                    (
                        <div
                            className="btn-progress"
                            style={{ width: `${downloadProgress}%` }}
                        />
                    ) : null
            }
        </button>
    );
}
