# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > return > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
(function(){ return a = b[$('x')] = $(c)[$('y')] = $(d); })();
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
  var tmpNestedAssignComMemberObj;
  var tmpNestedAssignComMemberProp;
  var tmpNestedAssignCompMemberObj;
  var tmpNestedAssignCompMemberProp;
  var tmpNestedAssignCompMemberRhs;
  var tmpNestedAssignObj;
  var tmpNestedAssignComMemberObj$1;
  var tmpNestedAssignComMemberProp$1;
  var tmpNestedAssignCompMemberObj$1;
  var tmpNestedAssignCompMemberProp$1;
  var tmpNestedAssignCompMemberRhs$1;
  {
    tmpNestedAssignComMemberObj = b;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
    tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
    tmpNestedAssignObj = $(c);
    tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp$1 = $('y');
    tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
    tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
    tmpNestedAssignCompMemberRhs$1 = $(d);
    tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
    tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
    let tmpReturnArg = a;
    return tmpReturnArg;
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
  var tmpNestedAssignComMemberObj;
  var tmpNestedAssignComMemberProp;
  var tmpNestedAssignCompMemberObj;
  var tmpNestedAssignCompMemberProp;
  var tmpNestedAssignCompMemberRhs;
  var tmpNestedAssignObj;
  var tmpNestedAssignComMemberObj$1;
  var tmpNestedAssignComMemberProp$1;
  var tmpNestedAssignCompMemberObj$1;
  var tmpNestedAssignCompMemberProp$1;
  var tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignObj = $(3);
  tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
  tmpNestedAssignComMemberProp$1 = $('y');
  tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
  tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
  tmpNestedAssignCompMemberRhs$1 = $(4);
  tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  a = tmpNestedAssignCompMemberRhs;
  let tmpReturnArg = a;
  return tmpReturnArg;
};
tmpNewObj();
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: 4,{"x":4},3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
