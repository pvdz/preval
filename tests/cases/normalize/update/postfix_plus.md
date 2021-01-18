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
tmpArg = tmpPostfixArg;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpPostfixArg;
let x = 1;
tmpPostfixArg = x;
x = x + 1;
tmpArg = tmpPostfixArg;
$(tmpArg);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
