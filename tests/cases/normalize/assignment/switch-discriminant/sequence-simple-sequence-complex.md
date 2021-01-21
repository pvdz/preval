# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > switch-discriminant > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
switch ((a, b).c = (a, $(b)).c = d) {}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  let tmpBindInitMemberObject = b;
  {
    a;
    {
      tmpAssignMemLhsObj = $(b);
      tmpAssignMemRhs = d;
      tmpAssignMemLhsObj.c = tmpAssignMemRhs;
    }
  }
  let tmpBindInitRhs = d;
  tmpBindInitMemberObject.c = tmpBindInitRhs;
  const tmpSwitchTest = tmpBindInitRhs;
  {
    let tmpFallthrough = false;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let b = { c: 2 };
let tmpBindInitMemberObject = b;
tmpAssignMemLhsObj = $(b);
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
tmpBindInitMemberObject.c = 3;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":2}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same
