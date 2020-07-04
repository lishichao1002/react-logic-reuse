import React, { Component } from 'react';
import { DownloadProgress } from '../../common/bridge';
import './index.scss';
import { getButton } from '../ButtonFactory/ButtonFactory';
import { InnerButtonProps } from '../../ButtonImpl1/AbstractButton';

class Button extends Component<InnerButtonProps> {

    render() {
        const { onClick, downloadProgress, downloadStatus, buttonText } = this.props;
        return (
            <button
                className="btn22-action"
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

export const Button2 = getButton(Button);
