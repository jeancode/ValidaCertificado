const https = require('https');

function checkCertificateValidity(url) {
    https.get(url, (res) => {
        const cert = res.socket.getPeerCertificate();
        console.log(cert);
        if (cert.valid_to && cert.valid_from) {
            const validTo = new Date(cert.valid_to);
            const validFrom = new Date(cert.valid_from);
            const currentDate = new Date();
            const timeRemaining = validTo.getTime() - currentDate.getTime();
            const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));



            console.log(cert.valid_to);
            console.log(cert.valid_from);
            console.log(daysRemaining);

            if (currentDate >= validFrom && currentDate <= validTo) {
                console.log(`El certificado SSL de ${url} es válido.`);
            } else {
                console.log(`El certificado SSL de ${url} ha caducado o no es válido.`);
            }
        } else {
            console.log(`No se pudo obtener la información del certificado SSL de ${url}.`);
        }
    }).on('error', (err) => {
        console.error(`Error al verificar el certificado SSL de ${url}: ${err.message}`);
    });
}

// Ejemplo de uso
const url = 'https://lyonsmoving.com/';  // Reemplaza 'example.com' con la URL que deseas verificar
checkCertificateValidity(url);