import { Component, ReactNode } from 'react';
import { bridge, DownloadProgress } from '../../common/bridge';
import { getButtonText } from '../../common/util';

export type ClickEvent = (e?: any) => void;

export interface ButtonProps {
    buttonText: string;
}

export interface InnerButtonProps {
    onClick: ClickEvent;
    downloadProgress: number;
    downloadStatus: DownloadProgress;
    buttonText: string
}

export interface ButtonState {
    downloadStatus: DownloadProgress;
    downloadProgress: number;
    buttonText: string;
}

/**
 * 模板方法模式
 * 封装按钮的交互逻辑，子类提供UI实现
 */
export abstract class AbstractButton extends Component {

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
        return this.renderButton({
            onClick: () => bridge.doAction(),
            downloadProgress,
            downloadStatus,
            buttonText: dynamicBtnText || dataBtnText
        });
    }

    abstract renderButton(options: InnerButtonProps): ReactNode;
}
