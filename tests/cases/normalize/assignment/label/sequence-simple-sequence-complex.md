# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > label > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
boo: (a, b).c = (a, $(b)).c = d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  {
    a;
    tmpAssignMemLhsObj = b;
    a;
    tmpNestedAssignObj = $(b);
    tmpNestedPropAssignRhs = d;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemRhs = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
    tmpAssignMemLhsObj_1.c = tmpAssignMemRhs;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpAssignMemLhsObj = b;
tmpNestedAssignObj = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpAssignMemRhs = tmpNestedPropAssignRhs;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj_1.c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
