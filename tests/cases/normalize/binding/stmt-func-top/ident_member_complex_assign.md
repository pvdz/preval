# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > stmt > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3, d = 4;
  let a = $(b).x = $(c).y = $(d);
  $(a, b, c, d);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  let a;
  const tmpNestedAssignObj = $(b);
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignObj$1 = $(c);
  const tmpNestedAssignPropRhs$1 = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
  tmpNestedAssignObj$1.y = tmpNestedPropAssignRhs;
  tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
  a = tmpNestedPropAssignRhs$1;
  $(a, b, c, d);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  let a;
  const tmpNestedAssignObj = $(b);
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignObj$1 = $(c);
  const tmpNestedAssignPropRhs$1 = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
  tmpNestedAssignObj$1.y = tmpNestedPropAssignRhs;
  tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
  a = tmpNestedPropAssignRhs$1;
  $(a, b, c, d);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 3
 - 3: 4
 - 4: 4, { x: '4' }, 3, 4
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
