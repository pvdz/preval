# Preval test case

# computed_no_no_yes.md

> normalize > optional > computed_no_no_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a[b][c]?.[d]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpComplexMemberObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
const a = {};
tmpComplexMemberObj = a[b];
tmpOptionalChaining = tmpComplexMemberObj[c];
tmpTernaryTest = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining[d]), tmpTernaryAlternate);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x = {};
x = x[x];
x = x[x];
x = x * x;
x = x ? x : ((x = x[x]), x);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpComplexMemberObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
const a = {};
tmpComplexMemberObj = a[b];
tmpOptionalChaining = tmpComplexMemberObj[c];
tmpTernaryTest = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining[d]), tmpTernaryAlternate);
$(tmpArg);
`````
