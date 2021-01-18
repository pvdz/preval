# Preval test case

# ident_simple.md

> normalize > assignment > binary-left > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = b) + 500);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
let a = 1;
let b = 2;
let c = 3;
a = b;
tmpBinaryLeft = b;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
let a = 1;
a = 2;
tmpBinaryLeft = 2;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[502], [2, 2, 3], null];

Normalized calls: Same

Final output calls: Same
