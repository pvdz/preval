# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > for-a > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = b.x = $(c).y = $(d);false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  let a;
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignObj = $(c);
  let tmpNestedAssignPropRhs$1 = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
  tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
  tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
  b.x = tmpNestedPropAssignRhs$1;
  a = tmpNestedPropAssignRhs$1;
  while (false) {
    $(a, b, c);
  }
}
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
let a;
let tmpNestedAssignPropRhs;
const tmpNestedAssignObj = $(3);
let tmpNestedAssignPropRhs$1 = $(4);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
while (false) {
  $(a, b, 3);
}
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'a' has already been declared ]>")
