# Preval test case

# prop_no_yes_no.md

> normalize > nullish > prop_no_yes_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b??c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryConsequent;
const a = {};
tmpNullish = a.b;
tmpTernaryTest = tmpNullish == null;
tmpArg = tmpTernaryTest ? ((tmpTernaryConsequent = c.d), tmpTernaryConsequent) : tmpNullish;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x = {};
x = x.x;
x = x * x;
x = x ? ((x = x.x), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryConsequent;
const a = {};
tmpNullish = a.b;
tmpTernaryTest = tmpNullish == null;
tmpArg = tmpTernaryTest ? ((tmpTernaryConsequent = c.d), tmpTernaryConsequent) : tmpNullish;
$(tmpArg);
`````
