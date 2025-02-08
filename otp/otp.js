const nodemailer=require("nodemailer")
const otpgenerate=require("otp-generator")
function generateOTP() {
    const  otp= otpgenerate.generate(6, { upperCaseAlphabets: true, specialChars: false });
    return otp
}
const transporter = nodemailer.createTransport({
    host: "",
    port: ,
    secure: true, 
    auth: {
      user: "",
      pass: "",
    },
});
async function SendOTP(mail,otp){
    var mailoptions={
        from: "", 
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
