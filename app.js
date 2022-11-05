let express = require('express');
const { json } = require("express");
let app = express();

app.use(json());
app.use(express.urlencoded({extended:true}));

function randomString(string){
    string = string.toLowerCase();
    let numbers = [];
    let result;

    // split it into an array according to spaces 
    stringArray = string.split(' ');

    // extract the numbers for the array
    stringArray.forEach(element => {
        if(!( isNaN( parseInt(element) ) ))
        {
            numbers.push(parseInt(element));
        }
    });
    
    // iterate over it for add, subtract or multiply
    if(stringArray.includes('add' || 'plus' || 'addition' || 'sum')){
        result = numbers[0] + numbers[1];
    }
    else if(stringArray.includes('subtract' || 'minus' || 'subtraction')){
        result = numbers[0] - numbers[1];
    }
    else if(stringArray.includes('multiply' || 'times' || 'multiplication' || 'multiplied')){
        result = numbers[0] * numbers[1];
    }
    else{
        return "No such operation";
    }
    
    return result;
    
};

app.post("/", async(req,res) => {
    const {operation_type : operation, x, y} = await req.body;
    // console.log(operation, x, y)
    let result;
    try {
        switch(operation)
        {
            case "addition":
                result = x + y;
                break;
            case "subtraction":
                result = x - y;
                break;
            case "multiplication":
                result = x * y;
                break;
            default:
                result = randomString(operation);
                break; 
        }

        if(!result) return res.status(500).send("Whoops, something went wrong");

        res.status(200).json({
            slackUsername: "Idee",
            operation_type: operation,
            result: result
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${5000}`);
})