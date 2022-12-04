import unfetch from 'unfetch'

let fetch = unfetch
if (typeof window !== 'undefined') {
    // @ts-ignore
    fetch = window.fetch || unfetch
}

export type Dispatcher = (url: string, body: object) => Promise<unknown>

export default function (): { dispatch: Dispatcher } {
    function dispatch(url: string, body: object): Promise<unknown> {
        return unfetch(url, {
            headers: { 'Content-Type': 'text/plain' },
            method: 'post',
            body: JSON.stringify(body),
        })
    }
    return {
        dispatch,
    }
}