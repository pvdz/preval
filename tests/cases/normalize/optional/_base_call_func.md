# Preval test case

# _base_call_func.md

> normalize > optional > _base_call_func
>
> Simple example

#TODO

## Input

`````js filename=intro
function f(){}
$(f?.());
`````

## Normalized

`````js filename=intro
function f() {}
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f()), tmpTernaryAlternate);
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {}
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f()), tmpTernaryAlternate);
$(tmpArg);
`````
