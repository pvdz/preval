# Preval test case

# member_computed.md

> normalize > optional > member_computed
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x?.[20]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
const x = 10;
tmpTernaryTest = x == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = x[20]), tmpTernaryAlternate);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = false;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = (10)[20]), tmpTernaryAlternate);
$(tmpArg);
`````
