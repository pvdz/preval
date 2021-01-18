# Preval test case

# ident_ident_assign.md

> normalize > assignment > return > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
(function(){ return a = b = $(c).y = $(d); })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNewObj = function () {
  var tmpNestedComplexRhs;
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  {
    tmpNestedAssignMemberObj = $(c);
    tmpNestedAssignMemberRhs = $(d);
    tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
    tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
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
let b = 2;
tmpNewObj = function () {
  var tmpNestedComplexRhs;
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  tmpNestedAssignMemberObj = $(3);
  tmpNestedAssignMemberRhs = $(4);
  tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, b, 3);
`````

## Result

Should call `$` with:
[[3], [4], "<crash[ Cannot set property 'y' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
