# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = ($(b), $(c)).x = c) + (a = ($(b), $(c)).x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = 2;
let c = 3;
$(b);
tmpNestedAssignObj = $(c);
tmpNestedPropAssignRhs = c;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
$(b);
tmpNestedAssignObj_1 = $(c);
tmpNestedPropAssignRhs_1 = c;
tmpNestedAssignObj_1.x = tmpNestedPropAssignRhs_1;
tmpNestedComplexRhs_1 = tmpNestedPropAssignRhs_1;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
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
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
$(2);
tmpNestedAssignObj = $(3);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
$(2);
tmpNestedAssignObj_1 = $(3);
tmpNestedPropAssignRhs_1 = 3;
tmpNestedAssignObj_1.x = tmpNestedPropAssignRhs_1;
tmpNestedComplexRhs_1 = tmpNestedPropAssignRhs_1;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 2
 - 3: 3
 - 4: 6
 - 5: 3,2,3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
