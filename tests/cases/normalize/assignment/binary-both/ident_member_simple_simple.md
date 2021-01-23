# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > binary-both > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$((a = b.x = c) + (a = b.x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
var tmpNestedComplexRhs$1;
var tmpNestedPropAssignRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedPropAssignRhs = c;
b.x = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedPropAssignRhs$1 = c;
b.x = tmpNestedPropAssignRhs$1;
tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$1;
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
var tmpNestedComplexRhs$1;
var tmpNestedPropAssignRhs$1;
let a = 1;
let b = { x: 2 };
tmpNestedPropAssignRhs = 3;
b.x = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedPropAssignRhs$1 = 3;
b.x = tmpNestedPropAssignRhs$1;
tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$1;
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 6
 - 1: 3,{"x":3},3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
