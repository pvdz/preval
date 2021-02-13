# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > stmt > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3, d = 4;
  let a = b.x = $(c).y = $(d);
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
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
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 4, { x: '4' }, 3
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
