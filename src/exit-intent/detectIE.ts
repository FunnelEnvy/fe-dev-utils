const detectIE = (): number | false => {
    const ua: string = window.navigator.userAgent;

    const msie: number = ua.indexOf('MSIE ');
    const trident: number = ua.indexOf('Trident/');
    const edge: number = ua.indexOf('Edge/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 => return version number
        const rv: number = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
};

export default detectIE;
