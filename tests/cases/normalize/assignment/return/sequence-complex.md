# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
(function(){ return (a, $(b)).c = d; })();
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
    {
      a;
      {
        tmpAssignMemLhsObj = $(b);
        tmpAssignMemRhs = d;
        tmpAssignMemLhsObj.c = tmpAssignMemRhs;
      }
    }
    let tmpStmtArg = d;
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
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemRhs = 3;
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  return 3;
};
tmpNewObj();
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":2}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same