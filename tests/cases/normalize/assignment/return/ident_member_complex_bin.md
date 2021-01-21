# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > return > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
(function(){ return a = $(b).x = c + d; })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNewObj = function () {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  {
    tmpNestedAssignMemberObj = $(b);
    tmpNestedAssignMemberRhs = c + d;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    a = tmpNestedAssignMemberRhs;
    let tmpStmtArg = a;
    return tmpStmtArg;
  }
};
tmpNewObj();
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { x: 2 };
tmpNewObj = function () {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  tmpNestedAssignMemberObj = $(b);
  tmpNestedAssignMemberRhs = 7;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same