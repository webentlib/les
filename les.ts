import { Toaster } from './toaster/toaster';

export const Les: any = {};

Les.decode = function(encodedStr) {
    // AI
    const regex = /=\?([^?]+)\?([bq])\?([^?]+)\?=/gi;
    return encodedStr.replace(regex, (match, charset, encoding, text) => {
        if (encoding.toLowerCase() === 'b') {
            // Base64 decoding
            const decodedBytes = atob(text);
            // Decode UTF-8 bytes
            return decodeURIComponent(escape(decodedBytes));
        } else if (encoding.toLowerCase() === 'q') {
            // Quoted-printable decoding (not needed here since your string uses 'b')
            // Implement if necessary
            return text;
        }
        return text;
    });
}

Les.export_to_file = async function({url, file_name}={}) {

    const response = await fetch(url);

    if (!response.ok) {
        Toaster.bake('Что-то пошло не так');
        return;
    }

    if (!file_name) {
        let disposition = response.headers.get('Content-Disposition');
        disposition = Les.decode(disposition);
        file_name = 'file.xlsx'; // fallback filename
        if (disposition && disposition.includes('filename=')) {
            const filenameMatch = disposition.match(/filename\*?=['"]?([^'";]+)['"]?/);
            if (filenameMatch && filenameMatch[1]) {
                file_name = decodeURIComponent(filenameMatch[1]);
            }
        }
    }

    const blob = await response.blob();
    const url_obj = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = file_name; // file_name with Cyrillic characters
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url_obj);
}