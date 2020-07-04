import { DownloadProgress } from './bridge';

export function getButtonText(status: DownloadProgress, progress?: number) {
    const ButtonTextMap = {
        1: '立即下载',
        2: '立即下载',
        3: (progress?: number) => `${progress}%`,
        4: '继续下载',
        5: '立即安装'
    };
    const res = ButtonTextMap[status];
    return (typeof res === 'string') ? res : res(progress);
}
