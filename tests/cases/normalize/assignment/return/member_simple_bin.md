# Preval test case

# member_simple_bin.md

> normalize > assignment > return > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
(function(){ return a.x = b + c; })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNewObj = function () {
  {
    let tmpBindInitMemberObject = a;
    let tmpBindInitRhs = b + c;
    tmpBindInitMemberObject.x = tmpBindInitRhs;
    let tmpReturnArg = tmpBindInitRhs;
    return tmpReturnArg;
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
  let tmpBindInitMemberObject = a;
  tmpBindInitMemberObject.x = 5;
  return 5;
};
tmpNewObj();
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5},2,3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }, 5, 3], null];

