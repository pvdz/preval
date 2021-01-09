# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
$(global??foo);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
global = global;
tmpTernaryTest = global == null;
tmpArg = tmpTernaryTest ? foo : global;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
global = global;
tmpTernaryTest = global == null;
tmpArg = tmpTernaryTest ? foo : global;
$(tmpArg);
`````
