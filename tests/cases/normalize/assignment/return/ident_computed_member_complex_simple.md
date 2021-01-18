# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > return > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
(function(){ return a = $(b)[$('x')] = c; })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNewObj = function () {
  var tmpNestedAssignComMemberObj;
  var tmpNestedAssignComMemberProp;
  {
    tmpNestedAssignComMemberObj = $(b);
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
    a = c;
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
  var tmpNestedAssignComMemberObj;
  var tmpNestedAssignComMemberProp;
  tmpNestedAssignComMemberObj = $(b);
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  a = 3;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, b, 3);
`````

## Result

Should call `$` with:
[[{ x: 2 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
