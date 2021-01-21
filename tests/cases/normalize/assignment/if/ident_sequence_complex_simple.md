# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
if (a = ($(b), $(c)).x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = 2;
let c = 3;
$(b);
tmpNestedAssignObj = $(c);
tmpNestedPropAssignRhs = c;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
$(2);
tmpNestedAssignObj = $(3);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 3,2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
