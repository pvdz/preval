# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > throw > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
throw a = b.x = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignMemberRhs = c + d;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpStmtArg = a;
  throw tmpStmtArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = b;
tmpNestedAssignMemberRhs = 7;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
a = tmpNestedAssignMemberRhs;
let tmpStmtArg = a;
throw tmpStmtArg;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ 7 ]>

Normalized calls: Same

Final output calls: Same
