# Preval test case

# _base_call_undef.md

> normalize > optional > _base_call_undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
$(f?.());
`````

## Normalized

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = undefined;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f()), tmpTernaryAlternate);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x = x;
x = x * x;
x = x ? x : ((x = x()), x);
x(x);
`````

## Output

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = undefined;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f()), tmpTernaryAlternate);
$(tmpArg);
`````
