# Preval test case

# ident_bin.md

> normalize > assignment > tagged > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$`abc ${a = b + c} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
tmpNestedComplexRhs = b + c;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
let a = 1;
tmpArg = ['abc ', ' def'];
tmpNestedComplexRhs = 5;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[['abc ', ' def'], 5], [5, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[['abc ', ' def'], 5], [5, 5, 3], null];

