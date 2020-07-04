import React, { Component } from 'react';
import { bridge, DownloadProgress } from '../../common/bridge';
import { getButtonText } from '../../common/util';
import { ButtonProps, ButtonState } from '../../ButtonImpl1/AbstractButton';

/**
 * 高阶组件
 */
export function getButton(Button: any) {
    return class AbstractButton extends Component {

        state: ButtonState;

        constructor(public props: ButtonProps) {
            super(props);
            this.state = {
                downloadStatus: DownloadProgress.UNKNOWN,
                downloadProgress: 0,
                buttonText: getButtonText(DownloadProgress.UNKNOWN)
            };
        }

        componentDidMount() {
            bridge.addProgressListener((progress, status) => {
                this.setState({
                    downloadStatus: status,
                    downloadProgress: progress,
                    buttonText: getButtonText(status, progress)
                });
            });
        }

        render() {
            const { buttonText: dataBtnText } = this.props;
            const { buttonText: dynamicBtnText, downloadProgress, downloadStatus } = this.state;
            const onClick = () => bridge.doAction();
            return (
                <Button
                    onClick={onClick}
                    downloadProgress={downloadProgress}
                    downloadStatus={downloadStatus}
                    buttonText={dynamicBtnText || dataBtnText}
                />
            );
        }
    };

}
