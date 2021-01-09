# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
$(global?.foo);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = global == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = global.foo), tmpTernaryAlternate);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = x * x;
x = x ? x : ((x = x.x), x);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = global == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = global.foo), tmpTernaryAlternate);
$(tmpArg);
`````
