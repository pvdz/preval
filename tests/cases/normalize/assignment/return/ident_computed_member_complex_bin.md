# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > return > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
(function(){ return a = $(b)[$('x')] = c + d; })();
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
  var tmpNestedAssignCompMemberObj;
  var tmpNestedAssignCompMemberProp;
  var tmpNestedAssignCompMemberRhs;
  {
    tmpNestedAssignCompMemberObj = $(b);
    tmpNestedAssignCompMemberProp = $('x');
    tmpNestedAssignCompMemberRhs = c + d;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
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
  var tmpNestedAssignCompMemberObj;
  var tmpNestedAssignCompMemberProp;
  var tmpNestedAssignCompMemberRhs;
  tmpNestedAssignCompMemberObj = $(b);
  tmpNestedAssignCompMemberProp = $('x');
  tmpNestedAssignCompMemberRhs = 7;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  a = tmpNestedAssignCompMemberRhs;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: "x"
 - 2: 7,{"x":7},3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 7 }], ['x'], [7, { x: 7 }, 7], null];

