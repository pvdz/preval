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

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = global == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = global.foo), tmpTernaryAlternate);
$(tmpArg);
`````
