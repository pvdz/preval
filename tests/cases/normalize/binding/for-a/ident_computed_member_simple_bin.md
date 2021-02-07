# Preval test case

# ident_computed_member_simple_bin.md

> normalize > assignment > for-a > ident_computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = b[$('x')] = c + d;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  let a_1;
  const tmpNestedAssignComMemberObj = b;
  const tmpNestedAssignComMemberProp = $('x');
  let tmpNestedAssignPropRhs = c + d;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a_1 = tmpNestedPropAssignRhs;
  while (false) {
    $(a_1, b, c);
  }
}
`````

## Output

`````js filename=intro
let b = { x: 2 };
let a_1;
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
a_1 = 7;
while (false) {
  $(a_1, b, 7);
}
`````

## Result

Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
