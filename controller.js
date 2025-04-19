const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
let fs=require("fs");
const { match } = require('assert');
let fetch=(req,res,next)=>{
   // console.log(req.file)
let uint8Array=new Uint8Array(fs.readFileSync(`./upload/${req.file.filename}`))
pdfjsLib.getDocument({data:uint8Array}).promise.then(async pdf=>{
   let pg=await pdf.getPage(1);
   let data=await pg.getTextContent()
   // console.log(data);
   let str1=" "
   data.items.map((item)=>{
      str1+=item.str+" "
   })
   const nameMatch = str1.match(/Name:\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i);
const txnMatch = str1.match(/Transaction ID:\s+(\d+)/);

if (nameMatch && txnMatch) {
  console.log("Name:",nameMatch[1]);
  console.log("Transaction ID:", txnMatch[1]);
}
req.data={
   "name":nameMatch[1],
   "transactionid":txnMatch[1]

  }
   console.log(str1);
   next();

}
)
}
module.exports={fetch};

