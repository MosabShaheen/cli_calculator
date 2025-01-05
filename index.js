#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
export function welcome() {
    const txt = chalk.blue("\n\n        Welcome to Calculator\n Do you want to calculate some number?");
    return txt;
}
export async function askName() {
    await console.log(welcome());
    let user = await inquirer.prompt({
        name: "user_name",
        type: "input",
        message: "What is your name?",
        default() {
            return 'User';
        }
    });
}
const wait = async () => { await new Promise((r) => setTimeout(r, 2000)); };
export async function questions() {
    const operations = await inquirer.prompt([
        {
            name: "ask_operators",
            type: "list",
            message: "Please select an opertion that you want\n",
            choices: [
                "Addition",
                "Subtraction",
                "Multiplication",
                "Division",
                "Modulas",
                "Percentage",
            ]
        },
        {
            name: "first_number",
            type: "number",
            message: "Please enter first number: ",
            default() {
                return 0;
            }
        },
        {
            name: "second_number",
            type: "number",
            message: "Please enter seconde number: ",
            default() {
                return 0;
            }
        }
    ]);
    return selectOperation(operations.ask_operators, operations.first_number, operations.second_number);
}
let result;
let defalut_ans = "Your answer is: ";
export async function selectOperation(operations, first_number, second_number) {
    console.log(chalk.red("Calculating..."));
    await wait();
    switch (operations) {
        case "Addition":
            result = first_number + second_number;
            console.log(defalut_ans + chalk.green(result + "\n"));
            break;
        case "Subtraction":
            result = first_number - second_number;
            console.log(defalut_ans + chalk.green(result + "\n"));
            break;
        case "Multiplication":
            result = first_number * second_number;
            console.log(defalut_ans + chalk.green(result + "\n"));
            break;
        case "Division":
            result = first_number / second_number;
            console.log(defalut_ans + chalk.green(result + "\n"));
            break;
        case "Modulas":
            result = first_number ** second_number;
            console.log(defalut_ans + chalk.green(result + "\n"));
            break;
        case "Percentage":
            result = first_number % second_number;
            console.log(defalut_ans + chalk.green(result + "\n"));
            break;
    }
}
let an_again = false;
export const ask = async () => {
    let con_ask = await inquirer.prompt({
        name: "ask_again",
        type: "confirm",
        message: "Do you want to continue?"
    });
    if (con_ask.ask_again) {
        an_again = true;
    }
    else {
        an_again = false;
        console.log("Thank you!");
    }
};
export const run_func = async () => {
    await askName();
    await questions();
    await ask();
    if (an_again) {
        while (an_again) {
            await console.log(welcome());
            await questions();
            await ask();
        }
    }
};
run_func();
