# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > for-a > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = $(b)[$('x')] = $(c)[$('y')] = $(d);false;) $(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  let a_1;
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignComMemberObj$1 = $(c);
  const tmpNestedAssignComMemberProp$1 = $('y');
  let tmpNestedAssignPropRhs$1 = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
  tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
  tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
  a_1 = tmpNestedPropAssignRhs$1;
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 'x'
 - 3: 3
 - 4: 'y'
 - 5: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
