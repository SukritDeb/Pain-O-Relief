const nodemailer=require("nodemailer")
const otpgenerate=require("otp-generator")
function generateOTP() {
    const  otp= otpgenerate.generate(6, { upperCaseAlphabets: true, specialChars: false });
    return otp
}
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true, 
    auth: {
      user: "subhajitsccseaot@gmail.com",
      pass: "rwoo rdbu nmly fanp",
    },
});
async function SendOTP(mail,otp){
    var mailoptions={
        from: "subhajitsccseaot@gmail.com", 
        to: mail,
        subject: "OTP FOR PAIN-O- RELIEF", 
        text: "This is you OTP for signing up in Pain-O-Relief.\n OTP:"+otp+"\n Thanks from Team Nexarion",
    }
    const info = await transporter.sendMail(mailoptions,function (error,info){
        if(error){
            console.log(error);
        }else{
            console.log("OTP sent successfully....")
        }

    });
  }
module.exports={generateOTP,SendOTP};