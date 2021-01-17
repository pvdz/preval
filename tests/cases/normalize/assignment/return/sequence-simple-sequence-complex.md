# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > return > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
(function(){ return (a, b).c = (a, $(b)).c = d; })();
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpNewObj = function () {
  var tmpAssignMemLhsObj;
  var tmpAssignMemRhs;
  {
    a;
    let tmpBindInitMemberObject = b;
    a;
    tmpAssignMemLhsObj = $(b);
    tmpAssignMemRhs = d;
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
    let tmpBindInitRhs = d;
    tmpBindInitMemberObject.c = tmpBindInitRhs;
    let tmpStmtArg = tmpBindInitRhs;
    return tmpStmtArg;
  }
};
tmpNewObj();
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNewObj;
let b = { c: 2 };
tmpNewObj = function () {
  var tmpAssignMemLhsObj;
  var tmpAssignMemRhs;
  let tmpBindInitMemberObject = b;
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemRhs = 3;
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  tmpBindInitMemberObject.c = 3;
  return 3;
};
tmpNewObj();
$(1, b, c, 3);
`````
