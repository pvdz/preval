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
var tmpArg$1;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpArg = ['abc ', ' def'];
tmpNestedPropAssignRhs = c;
b.x = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
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
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
tmpArg = ['abc ', ' def'];
tmpNestedPropAssignRhs = 3;
b.x = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpArg$1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg$1);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: ["abc "," def"],3
 - 1: 3,{"x":3},3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
