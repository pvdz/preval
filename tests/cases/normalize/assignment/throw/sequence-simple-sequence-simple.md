# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > throw > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
throw (a, b).c = (a, b).c = d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  a;
  let tmpBindInitMemberObject = b;
  a;
  tmpAssignMemLhsObj = b;
  tmpAssignMemRhs = d;
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  let tmpBindInitRhs = d;
  tmpBindInitMemberObject.c = tmpBindInitRhs;
  let tmpStmtArg = tmpBindInitRhs;
  throw tmpStmtArg;
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let b = { c: 2 };
let tmpBindInitMemberObject = b;
tmpAssignMemLhsObj = b;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
tmpBindInitMemberObject.c = 3;
throw 3;
$(1, b, c, 3);
`````
