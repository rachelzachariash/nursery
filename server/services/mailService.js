var nodemailer = require('nodemailer');
exports.emailQuestions = function (toMail) {
    var transporter = nodemailer.createTransport({
        service: 'gmail.com',
        auth: {
            user: 'pirchayhgan@gmail.com ',
            pass: 'prjhvdi1'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'pirchayhgan@gmail.com ',
        to: toMail,
        subject: 'שאלתך התקבלה במערכת',
        html: "<div><h3><b style=\"color:#f8ce01;\">שלום!</b></h3> התקבלה שאלתך אנו נשתדל לענות לך תוך 14 ימי עבודה בעז\"\ה<div></div></b><div>בברכה:</div></b><div>פרחי הגן</div></div>", // html body
       
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('sent email!')
        }
    })
}



exports.emailBuyProducts= function (toMail,name,address,price) {


    var transporter = nodemailer.createTransport({
        service: 'gmail.com',
        auth: {
            user: 'pirchayhgan@gmail.com ',
            pass: 'prjhvdi1'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions = {
        from: 'pirchayhgan@gmail.com ',
        to: toMail,
        subject: 'הזמנתך התקבלה בהצלחה',
        html: `<div><h3><b style=\"color:#f8ce01;\">שלום ${name}!</b></h3> <div> סה"כ עלות המוצרים היא:${price}!</div><div> המוצרים יגיעו לכתובת: ${address}!</div>תוך 4 ימי עבודה<div></div>אם הכתובת לא נכונה יש ליצור קשר במספר: 03-5612525<div></div>אנו שמחים שבחרת במשתלה שלנו <div></b><div>בברכה:</div></b><div>פרחי הגן</div></div></div>`, // html body
       
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('sent email!')
        }
    })
}