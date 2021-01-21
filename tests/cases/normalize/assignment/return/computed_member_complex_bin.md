# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > return > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
(function(){ return $(a)[$('x')] = b + c; })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNewObj = function () {
  var tmpAssignComputedObj;
  var tmpAssignComputedProp;
  var tmpAssignComputedRhs;
  {
    let tmpBindInitMemberObject = $(a);
    let tmpBindInitRhs = b + c;
    {
      tmpAssignComputedObj = tmpBindInitMemberObject;
      tmpAssignComputedProp = $('x');
      tmpAssignComputedRhs = tmpBindInitRhs;
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    }
    let tmpStmtArg = tmpBindInitRhs;
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
  var tmpAssignComputedObj;
  var tmpAssignComputedProp;
  var tmpAssignComputedRhs;
  let tmpBindInitMemberObject = $(a);
  tmpAssignComputedObj = tmpBindInitMemberObject;
  tmpAssignComputedProp = $('x');
  tmpAssignComputedRhs = 5;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  return 5;
};
tmpNewObj();
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: "x"
 - 2: {"x":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], ['x'], [{ x: 5 }, 5, 3], null];

