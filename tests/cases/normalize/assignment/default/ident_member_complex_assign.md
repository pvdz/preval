# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > default > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { default: a = $(b).x = $(c).y = $(d); }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      tmpNestedAssignObj = $(b);
      tmpNestedAssignMemberObj = tmpNestedAssignObj;
      tmpNestedAssignObj_1 = $(c);
      tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
      tmpNestedAssignMemberRhs_1 = $(d);
      tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
      a = tmpNestedAssignMemberRhs;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
$('a');
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj_1 = $(3);
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignMemberRhs_1 = $(4);
tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
a = tmpNestedAssignMemberRhs;
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: {"x":4}
 - 2: 3
 - 3: 4
 - 4: 4,{"x":4},3,4
 - 5: undefined

Normalized calls: Same

Final output calls: Same
