# Preval test case

# ident_simple.md

> normalize > assignment > tagged > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$`abc ${a = b} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
let a = 1;
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
a = b;
tmpArg$1 = b;
$(tmpArg, tmpArg$1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
let a = 1;
tmpArg = ['abc ', ' def'];
a = 2;
tmpArg$1 = 2;
$(tmpArg, tmpArg$1);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: ["abc "," def"],2
 - 1: 2,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
