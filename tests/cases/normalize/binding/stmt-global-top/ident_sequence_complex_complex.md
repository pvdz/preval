# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3;
let a = ($(b), $(c)).x = $(c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
let a;
$(b);
const tmpNestedAssignObj = $(c);
let tmpNestedAssignPropRhs = $(c);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
let a;
$(2);
const tmpNestedAssignObj = $(3);
let tmpNestedAssignPropRhs = $(3);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 3
 - 4: 3, 2, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
