export enum DownloadProgress {
    UNKNOWN = 1,
    // 待开始
    WAIT_START = 2,
    // 下载中
    DOWNLOADING = 3,
    // 暂停
    PENDING = 4,
    // 下载完成
    DOWNLOAD_COMPLETE = 5
}

export type ProgressListener = (progress: number, status: DownloadProgress) => void;

/**
 * 模拟下载
 */
let downloadStatus = DownloadProgress.WAIT_START;
let progress = 0;
let timer: any = -1;
let listeners: ProgressListener[] = [];

function startTimer() {
    timer = setInterval(() => {
        progress++;
        if (progress >= 100) {
            stopTimer();
            listeners.forEach((listener) => listener(progress, DownloadProgress.DOWNLOAD_COMPLETE));
        } else {
            listeners.forEach((listener) => listener(progress, DownloadProgress.DOWNLOADING));
        }
    }, 50);
}

function stopTimer() {
    clearInterval(timer);
    timer = -1;
}


export const bridge = {
    addProgressListener(listener: ProgressListener) {
        listener(0, downloadStatus);
        listeners.push(listener);
    },
    doAction() {
        switch (downloadStatus) {
            case DownloadProgress.WAIT_START:
                downloadStatus = DownloadProgress.DOWNLOADING;
                startTimer();
                break;
            case DownloadProgress.DOWNLOADING:
                downloadStatus = DownloadProgress.PENDING;
                stopTimer();
                break;
            case DownloadProgress.PENDING:
                downloadStatus = DownloadProgress.DOWNLOADING;
                startTimer();
                break;
        }
    }
};
