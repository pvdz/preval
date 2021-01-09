# Preval test case

# member_computed.md

> normalize > nullish > member_computed
>
> nullish chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x??[20]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
const x = 10;
x = x;
tmpTernaryTest = x == null;
tmpArg = tmpTernaryTest ? ((tmpTernaryConsequent = [20]), tmpTernaryConsequent) : x;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = 8;
x = x;
x = x * x;
x = x ? ((x = [8]), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
const x = 10;
x = x;
tmpTernaryTest = x == null;
tmpArg = tmpTernaryTest ? ((tmpTernaryConsequent = [20]), tmpTernaryConsequent) : x;
$(tmpArg);
`````
