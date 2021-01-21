# Preval test case

# ident_ident_assign.md

> normalize > assignment > for-let > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (let wat = a = b = $(c).y = $(d); false;) $(wat);
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
  tmpNestedAssignMemberObj = $(c);
  tmpNestedAssignMemberRhs = $(d);
  tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let wat = a;
  while (false) {
    $(wat);
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
tmpNestedAssignMemberObj = $(3);
tmpNestedAssignMemberRhs = $(4);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let wat = a;
while (false) {
  $(wat);
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 4,4,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
