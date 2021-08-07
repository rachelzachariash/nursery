const lenOfID=9; //len of id is 9
function checksID(numInSteing){
    
    let lenOfid = numInSteing.length;
    if(lenOfid===0){
        return 'This field is required'
    }
    if(lenOfid===8) {//if ther 8 could be a good idnumber for checing and 0 
        const theFirstNumOfId='0';
        numInSteing=theFirstNumOfId+numInSteing;
        console.log(numInSteing)
        lenOfid++;
    }

    if(lenOfid!==9){ 
        return false;
    }
    const id=Number(numInSteing);
    if(isNaN(id)){
        return false;
    }
    
    let arrayOfNumId = []; 
    let sumOfAllIdNum = 0;
    for (let index = 0; index < lenOfID; index++) {
        if(index%2 === 0){ //if odd multy by 1
            arrayOfNumId.push(numInSteing[index]*1); //bush in the array the number 
        }
        else{
            arrayOfNumId.push(numInSteing[index]*2);
        }
    }
    for (let index = 0; index < lenOfID; index++) {
        if(arrayOfNumId[index]>9){ //if the a number is more than 9 need to chanch it
            const ones = arrayOfNumId[index]%10
            const tens=(arrayOfNumId[index]-arrayOfNumId[index]%10)/10;
            arrayOfNumId[index]=ones + tens
        }
    }
    for (let index = 0; index < lenOfID; index++) { //sum all the num
        sumOfAllIdNum = sumOfAllIdNum + arrayOfNumId[index];
    }
    if(sumOfAllIdNum%10 === 0){ //checker with it is divided by 10
        return true;
    }
    return false;
}

function checkName(name){ //name longer than one char
    const lenOfName = name.length;
    if(lenOfName===0){
        return 'This field is required'
    }
    if(lenOfName < 1 ){
        return false;
    }
    return true;
}

function checksEmail(email){ //check tha there is a @
    const lenOfEmail = email.length;
    if(lenOfEmail===0){
        return 'This field is required'
    }
    const at = email.lastIndexOf("@");
    if(at===-1){
        return false;
    }
    return true;
}

function checkpfone(pfoneNum){
    const lenOfPfoneNum = pfoneNum.length;
    if(lenOfPfoneNum===0){
        return 'This field is required'
    }
    const pfone=Number(pfoneNum);//check that is a number
    if(isNaN(pfone)){
        return false;
    }
    const lenpfone = pfoneNum.length;//and long on enough
    if(lenpfone>=7){
        return true;
    }
    return false;
}

function checkCreditNumber(creditNumber){ 
    const lenOfcreditNumber = creditNumber.length;
    if(lenOfcreditNumber===0){
        return 'This field is required'
    }
    const inNumber = Number(creditNumber); //check that is a number
    if(isNaN(inNumber)){
        return false;
    }
    const lenpCreditNumber = creditNumber.length; //the appropriate length for a credit number
    if(lenpCreditNumber > 7 && lenpCreditNumber < 16){
        return true;
    }
    return false;
}

function checkCreditDate(creditDate){
    const lenOfCreditDate = creditDate.length;
    if(lenOfCreditDate===0){
        return 'This field is required'
    }
    const dateInNumber = Number(creditDate); //check that is a number
    if(isNaN(dateInNumber)){
        return false;
    }
    const lenpCreditDate = creditDate.length;
    if(lenpCreditDate === 4){ //checks if has 4 numbers
        return true;
    }
    return false;
}



function checkCreditThreeNumBackCrad(creditthree){
    const lenOfCreditthree = creditthree.length;
    if(lenOfCreditthree===0){
        return 'This field is required'
    }
    const threeNumInNumber = Number(creditthree);
    if(isNaN(threeNumInNumber)){
        return false;
    }
    const lenpCreditThreeNum = creditthree.length;
    if(lenpCreditThreeNum === 3){ //checks if has 3 numbers
        return true;
    }
    return false;
}
function checkingAddress(address){
    const lenOfAddress = address.length;
    if(lenOfAddress===0){
        return 'This field is required'
    }

    if(lenOfAddress < 1 ){
        return false;
    }
    return true;
}

export { checkCreditThreeNumBackCrad, checkCreditDate,
    checkCreditNumber, checksEmail, 
    checkName, checkpfone, checksID,checkingAddress }
