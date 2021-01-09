# Preval test case

# member_prop.md

> normalize > optional > member_prop
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x?.length);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
const x = 10;
tmpTernaryTest = x == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = x.length), tmpTernaryAlternate);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = false;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = (10).length), tmpTernaryAlternate);
$(tmpArg);
`````
