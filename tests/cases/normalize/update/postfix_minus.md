# Preval test case

# postfix_minus.md

> normalize > update > postfix_minus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(x--);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpPostfixArg;
let x = 1;
tmpPostfixArg = x;
x = x - 1;
tmpArg = x;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpPostfixArg;
let x = 1;
tmpPostfixArg = x;
x = x - 1;
tmpArg = x;
$(tmpArg);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: BAD?!
[[0], null];

Final output calls: BAD!!
[[0], null];

