# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > default > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { default: a = b[$('x')] = $(c)[$('y')] = $(d); }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
{
  let tmpFallthrough = false;
  {
    ('default case:');
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
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
$('a');
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
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "x"
 - 2: 3
 - 3: "y"
 - 4: 4
 - 5: 4,{"x":4},3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
