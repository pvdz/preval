# Preval test case

# ident_simple.md

> normalize > assignment > call > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$(a = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
a = b;
tmpArg = b;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
let a = 1;
a = 2;
tmpArg = 2;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 2,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
