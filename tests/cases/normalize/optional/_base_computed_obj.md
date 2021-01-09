# Preval test case

# _base_computed_obj.md

> normalize > optional > _base_computed_obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {10: 20};
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
f = { 10: 20 };
x = 10;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f[x]), tmpTernaryAlternate);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x = { 8: 8 };
var x = 8;
x = x * x;
x = x ? x : ((x = x[x]), x);
x(x);
`````

## Output

`````js filename=intro
var f;
var x;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = { 10: 20 };
x = 10;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f[x]), tmpTernaryAlternate);
$(tmpArg);
`````
