# Preval test case

# postfix_plus.md

> normalize > update > postfix_plus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(x++);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpPostfixArg;
let x = 1;
tmpPostfixArg = x;
x = x + 1;
tmpArg = x;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = 8;
x = x;
x = x * 8;
x = x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpPostfixArg;
let x = 1;
tmpPostfixArg = x;
x = x + 1;
tmpArg = x;
$(tmpArg);
`````
