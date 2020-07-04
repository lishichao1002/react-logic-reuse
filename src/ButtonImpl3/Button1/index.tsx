import React from 'react';
import { InnerButtonProps } from '../../ButtonImpl1/AbstractButton';
import { DownloadProgress } from '../../common/bridge';
import { getButton } from '../ButtonFactory/ButtonFactory';
import './index.scss';

function Button(props: InnerButtonProps) {
    const { onClick, downloadProgress, downloadStatus, buttonText } = props;
    return (
        <button
            className="btn31-action"
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

export const Button1 = getButton(Button);
