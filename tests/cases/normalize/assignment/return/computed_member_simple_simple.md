# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > return > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
(function(){ return a[$('x')] = b; })();
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
    tmpAssignedComputedObj = a;
    tmpAssignedComputedProp = $('x');
    tmpAssignedComputedObj[tmpAssignedComputedProp] = b;
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
  var tmpAssignedComputedObj;
  var tmpAssignedComputedProp;
  tmpAssignedComputedObj = a;
  tmpAssignedComputedProp = $('x');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = 2;
  return 2;
};
tmpNewObj();
$(a, 2, 3);
`````

## Result

Should call `$` with:
[['x'], [{ x: 10, undefined: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
