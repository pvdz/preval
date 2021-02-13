# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > stmt > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= $(b).x = $(c).y = $(d);
  $(a, b, c, d);
}
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = { x: 2 };
    let c = 3;
    let d = 4;
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedObj$1 = $(c);
    const varInitAssignLhsComputedRhs$1 = $(d);
    varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    let a = varInitAssignLhsComputedRhs;
    $(a, b, c, d);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = { x: 2 };
    let c = 3;
    let d = 4;
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedObj$1 = $(c);
    const varInitAssignLhsComputedRhs$1 = $(d);
    varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
    let a = varInitAssignLhsComputedRhs$1;
    $(a, b, c, d);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: { x: '2' }
 - 3: 3
 - 4: 4
 - 5: 4, { x: '4' }, 3, 4
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
