# Preval test case

# member_complex_simple.md

> normalize > assignment > return > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
(function(){ return $(a).x = b; })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNewObj = function () {
  var tmpAssignMemLhsObj;
  var tmpAssignMemRhs;
  {
    {
      tmpAssignMemLhsObj = $(a);
      tmpAssignMemRhs = b;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
    let tmpStmtArg = b;
    return tmpStmtArg;
  }
};
tmpNewObj();
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNewObj;
let a = { x: 10 };
tmpNewObj = function () {
  var tmpAssignMemLhsObj;
  var tmpAssignMemRhs;
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemRhs = 2;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  return 2;
};
tmpNewObj();
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same