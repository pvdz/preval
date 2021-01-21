# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > for-a > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for ((a, $(b)).c = (a, b).c = d;false;);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  {
    a;
    tmpAssignMemLhsObj = $(b);
    tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
    a;
    tmpNestedAssignObj = b;
    tmpNestedPropAssignRhs = d;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemRhs = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
    tmpAssignMemLhsObj_2.c = tmpAssignMemRhs;
  }
  while (false) {}
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = b;
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpAssignMemRhs = tmpNestedPropAssignRhs;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.c = tmpAssignMemRhs;
while (false) {}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
