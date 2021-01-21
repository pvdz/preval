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
tmpArg = tmpPostfixArg;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpPostfixArg;
let x = 1;
tmpPostfixArg = x;
x = x - 1;
tmpArg = tmpPostfixArg;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
