# Preval test case

# ident_ident_assign.md

> normalize > assignment > default > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
switch ($('a')) { default: a = b = $(c).y = $(d); }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      tmpNestedAssignMemberObj = $(c);
      tmpNestedAssignMemberRhs = $(d);
      tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
      tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
      b = tmpNestedComplexRhs;
      a = tmpNestedComplexRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
$('a');
tmpNestedAssignMemberObj = $(3);
tmpNestedAssignMemberRhs = $(4);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: 3
 - 2: 4
 - 3: 4,4,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
