# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > return > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
(function(){ return (a, b).c = (a, $(b)).c = d; })();
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpNewObj = function () {
  var tmpAssignMemLhsObj;
  {
    a;
    let tmpBindInitMemberObject = b;
    {
      a;
      tmpAssignMemLhsObj = $(b);
      tmpAssignMemLhsObj.c = d;
    }
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
  let tmpBindInitMemberObject = b;
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemLhsObj.c = 3;
  tmpBindInitMemberObject.c = 3;
  return 3;
};
tmpNewObj();
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
