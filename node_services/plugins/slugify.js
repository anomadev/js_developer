module.exports = function(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Remplaza los espacios por: -
        .replace(/[^\w\-]+/g, '')       // Remplaza los caracteres especiales por: -
        .replace(/\-\-+/g, '-')         // Remplaza los multiples - por: -
        .replace(/^-+/, '')             // Remueve - del inicio de la cadena
        .replace(/-+$/, '');            // Remueve - del final de la cadena
}