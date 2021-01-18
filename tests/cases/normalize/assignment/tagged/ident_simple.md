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
var tmpArg_1;
let a = 1;
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
a = b;
tmpArg_1 = b;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
let a = 1;
tmpArg = ['abc ', ' def'];
a = 2;
tmpArg_1 = 2;
$(tmpArg, tmpArg_1);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[['abc ', ' def'], 2], [2, 2, 3], null];

Normalized calls: Same

Final output calls: Same
