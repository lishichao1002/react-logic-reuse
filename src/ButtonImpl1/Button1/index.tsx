import React from 'react';
import { AbstractButton, InnerButtonProps } from '../AbstractButton';
import { DownloadProgress } from '../../common/bridge';
import './index.scss';

export class Button1 extends AbstractButton {
    renderButton(options: InnerButtonProps) {
        const { onClick, downloadProgress, downloadStatus, buttonText } = options;
        return (
            <button
                className="btn11-action"
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
}
