# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > default > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
switch ($('a')) { default: (a, b).c = (a, b).c = d; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      {
        a;
        tmpAssignMemLhsObj = b;
        a;
        tmpNestedAssignObj = b;
        tmpNestedPropAssignRhs = d;
        tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
        tmpAssignMemRhs = tmpNestedPropAssignRhs;
        tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
        tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
$('a');
tmpAssignMemLhsObj = b;
tmpNestedAssignObj = b;
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpAssignMemRhs = tmpNestedPropAssignRhs;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
