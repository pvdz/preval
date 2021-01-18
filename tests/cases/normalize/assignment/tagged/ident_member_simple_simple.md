# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > tagged > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$`abc ${a = b.x = c} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpArg = ['abc ', ' def'];
b.x = c;
tmpNestedComplexRhs = c;
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
let b = { x: 2 };
tmpArg = ['abc ', ' def'];
b.x = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[['abc ', ' def'], 3], [3, { x: 3 }, 3], null];

Normalized calls: Same

Final output calls: Same
