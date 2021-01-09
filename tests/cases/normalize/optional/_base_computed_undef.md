# Preval test case

# _base_computed_undef.md

> normalize > optional > _base_computed_undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
var x = 10;
$(f?.[x]);
`````

## Normalized

`````js filename=intro
var f;
var x;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = undefined;
x = 10;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f[x]), tmpTernaryAlternate);
$(tmpArg);
`````

## Output

`````js filename=intro
var f;
var x;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = undefined;
x = 10;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f[x]), tmpTernaryAlternate);
$(tmpArg);
`````
