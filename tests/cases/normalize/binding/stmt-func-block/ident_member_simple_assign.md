# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > stmt > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= b.x = $(c).y = $(d);
  $(a, b, c);
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
    let a;
    let tmpNestedAssignPropRhs;
    const tmpNestedAssignObj = $(c);
    const tmpNestedAssignPropRhs$1 = $(d);
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
    tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
    b.x = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
    $(a, b, c);
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
    let a;
    let tmpNestedAssignPropRhs;
    const tmpNestedAssignObj = $(c);
    const tmpNestedAssignPropRhs$1 = $(d);
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
    tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
    b.x = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
    $(a, b, c);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 3
 - 3: 4
 - 4: 4, { x: '4' }, 3
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
