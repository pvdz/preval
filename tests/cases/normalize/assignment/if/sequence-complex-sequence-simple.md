# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > if > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
if ((a, $(b)).c = (a, b).c = d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpAssignMemLhsObj = $(b);
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
a;
tmpNestedAssignObj = b;
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpAssignMemRhs = tmpNestedPropAssignRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
const tmpIfTest = tmpAssignMemRhs;
tmpIfTest;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = b;
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpAssignMemRhs = tmpNestedPropAssignRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
