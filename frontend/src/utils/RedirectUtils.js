import {CONTEXT_PATH} from "../properties";

export function redirect(uri) {
    window.open(`${CONTEXT_PATH}${uri}`, "_self");
}

export function redirectError(error) {
    if (error.response) {
        const uri = `${CONTEXT_PATH}/error-page?status=${error.response.status}&message=${error.response.data.message}`;
        window.open(uri, "_self");
    }
    else {
        redirect(`${CONTEXT_PATH}`);
    }
}