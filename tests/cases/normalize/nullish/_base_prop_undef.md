# Preval test case

# _base_prop_undef.md

> normalize > nullish > _base_prop_undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
$(f??x);
`````

## Normalized

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
f = undefined;
f = f;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? x : f;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = x;
x = x;
x = x * x;
x = x ? x : x;
x(x);
`````

## Output

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
f = undefined;
f = f;
tmpTernaryTest = f == null;
tmpArg = tmpTernaryTest ? x : f;
$(tmpArg);
`````