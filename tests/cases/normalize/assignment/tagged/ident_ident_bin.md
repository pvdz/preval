# Preval test case

# ident_ident_bin.md

> normalize > assignment > tagged > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$`abc ${a = b = c + d} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpArg = ['abc ', ' def'];
tmpNestedComplexRhs$1 = c + d;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpArg$1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg$1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
tmpArg = ['abc ', ' def'];
tmpNestedComplexRhs$1 = 7;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpArg$1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg$1);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: ["abc "," def"],7
 - 1: 7,7,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[['abc ', ' def'], 7], [7, 7, 7], null];

