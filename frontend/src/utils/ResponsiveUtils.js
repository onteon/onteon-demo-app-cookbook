import {useMediaQuery} from "react-responsive";

export function getIsXxl() {
    return () => useMediaQuery({minWidth: 1600});
}

export function getIsXl() {
    return () => useMediaQuery({minWidth: 1200});
}

export function getIsLg() {
    return () => useMediaQuery({minWidth: 992});
}

export function getIsMd() {
    return () => useMediaQuery({minWidth: 768});
}

export function getIsSm() {
    return () => useMediaQuery({minWidth: 576});
}

export function getIsXs() {
    return () => useMediaQuery({maxWidth: 576});
}