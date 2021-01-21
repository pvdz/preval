# Preval test case

# ident_bin.md

> normalize > assignment > binary-left > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = b + c) + 500);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
tmpNestedComplexRhs = b + c;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedComplexRhs;
let a = 1;
tmpNestedComplexRhs = 5;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: 505
 - 1: 5,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[505], [5, 5, 3], null];

