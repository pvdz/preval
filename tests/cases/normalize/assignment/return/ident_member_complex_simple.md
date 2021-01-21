# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > return > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
(function(){ return a = $(b).x = c; })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNewObj = function () {
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  {
    tmpNestedAssignObj = $(b);
    tmpNestedPropAssignRhs = c;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
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
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: 3,{"x":3},3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
