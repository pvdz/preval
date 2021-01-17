# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > return > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
(function(){ return a[$('x')] = b + c; })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNewObj = function () {
  var tmpAssignedComputedObj;
  var tmpAssignedComputedProp;
  {
    let tmpBindInitMemberObject = a;
    let tmpBindInitRhs = b + c;
    tmpAssignedComputedObj = tmpBindInitMemberObject;
    tmpAssignedComputedProp = $('x');
    tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpBindInitRhs;
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
  var tmpAssignedComputedObj;
  var tmpAssignedComputedProp;
  let tmpBindInitMemberObject = a;
  tmpAssignedComputedObj = tmpBindInitMemberObject;
  tmpAssignedComputedProp = $('x');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = 5;
  return 5;
};
tmpNewObj();
$(a, 5, 3);
`````
