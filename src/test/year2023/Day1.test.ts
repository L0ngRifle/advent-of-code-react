import { Task } from '../util/Task'
import * as _ from 'lodash'

class Day1 extends Task {
  constructor() {
    super(1, 2023)
  }

  part1(input: string) {
    const inputArray = input.split("\n")    
    const justDigits = inputArray.map(_=>_.replace(/\D/g,""))
    const firstLast = justDigits.map(_=>{
        let first = _.charAt(0)
        let last = _.charAt(_.length - 1)
        return +(first + last)
    })
    const sum = firstLast.reduce((sum, current) => sum + current)
    // console.log(justDigits)
    // console.log(firstLast)
    // console.log(sum)
    return sum
  }

  part2(input: string) {
        
    const array = input.split("\n")

    const numbersWithLetter = ["zero","one","two","three","four","five","six","seven","eight","nine"]
    const firstLast = array.map((line, i)=>{
        //console.log(`line------------ ${i+1} ----------------`)
        //console.log("line: ",line)

        let firstNumWithLetter  = ""
        let indexOfFirstNumWithLetter = 99999
        let lastNumWithLetter = ""
        let indexOfLastNumWithLetter =  -1
        numbersWithLetter.forEach(num =>{
            let occurrences: number[] = locations(num,line)
            if(occurrences.length !== 0){
                let firstIndex = getFirstElement(occurrences)
                let lastIndex = getLastElement(occurrences)
                firstNumWithLetter = indexOfFirstNumWithLetter > firstIndex ? num : firstNumWithLetter
                indexOfFirstNumWithLetter = indexOfFirstNumWithLetter > firstIndex ? firstIndex : indexOfFirstNumWithLetter 
                lastNumWithLetter = indexOfLastNumWithLetter < lastIndex ? num : lastNumWithLetter
                indexOfLastNumWithLetter = indexOfLastNumWithLetter < lastIndex ? lastIndex : indexOfLastNumWithLetter
            }
        }) 
        
        let lineToDigit = line.replace(/\D/g,"")

        let firstword = numbersWithLetter.indexOf(firstNumWithLetter).toString()
        let firstDigit = lineToDigit.charAt(0)
        let indexOfFirstDigit = line.indexOf(firstDigit)
        let first = indexOfFirstDigit < indexOfFirstNumWithLetter ? firstDigit : firstword

        let lastword = numbersWithLetter.indexOf(lastNumWithLetter).toString() 
        let lastDigit = lineToDigit.charAt(lineToDigit.length - 1)    
        let indexOfLastDigit = getLastIndex(lastDigit,line)
        let last = indexOfLastDigit > indexOfLastNumWithLetter ? lastDigit : lastword

        //console.log("output: ",first, last)
        return +(first + last)
    })  
    //console.log(firstLast)

    const sum = firstLast.reduce((sum, current) => sum + current)
    //console.log(sum)



    function getLastElement<T>(array: T[]):T{
        if (array.length === 0) throw new Error ("array is empty");
        return array[array.length - 1];
    }
    function getFirstElement<T>(array: T[]):T{
        if (array.length === 0) throw new Error ("array is empty");
        return array[0];
    }
    function getLastIndex(lastDigit:string,line:string){
        let indexES = locations(lastDigit,line)
        return indexES[indexES.length - 1];
    }
    function locations(substring:string,string:string){
        let a:number[]=[];
        let i:number=-1;
        while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
        return a;
    }
    return sum
  }
}

test('Part 1 example', () => {
  const day = new Day1()
  const input = day.getExample(1)
  expect(day.part1(input)).toBe(142)
})

test('Part 1 task', () => {
  const day = new Day1()
  const input = day.getTask()
  expect(day.part1(input)).toBe(54667)
})

test('Part 2 example', () => {
  const day = new Day1()
  const input = day.getExample(2)
  expect(day.part2(input)).toBe(281)
})

test('Part 2 task', () => {
  const day = new Day1()
  const input = day.getTask()
  expect(day.part2(input)).toBe(54203)
})
