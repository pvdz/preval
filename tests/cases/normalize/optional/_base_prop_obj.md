# Preval test case

# _base_prop_obj.md

> normalize > optional > _base_prop_obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {x: 10};
$(f?.x);
`````

## Normalized

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = { x: 10 };
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f.x), tmpTernaryAlternate);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x = { x: 8 };
x = x * x;
x = x ? x : ((x = x.x), x);
x(x);
`````

## Output

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = { x: 10 };
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = f.x), tmpTernaryAlternate);
$(tmpArg);
`````
