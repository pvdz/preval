# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > while > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 0, d = 0;
while (a = b.x = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 0;
let d = 0;
while (true) {
  {
    tmpNestedAssignMemberObj = b;
    tmpNestedAssignMemberRhs = c + d;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    a = tmpNestedAssignMemberRhs;
    let ifTestTmp = a;
    if (ifTestTmp) {
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignMemberRhs = 0;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, b, 0);
`````

## Result

Should call `$` with:
[[0, { x: 0 }, 0], null];

Normalized calls: Same

Final output calls: Same
