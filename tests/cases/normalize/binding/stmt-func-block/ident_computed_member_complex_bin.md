# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > stmt > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= $(b)[$('x')] = c + d;
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
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $('x');
    const varInitAssignLhsComputedRhs = c + d;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    let a = varInitAssignLhsComputedRhs;
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
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $('x');
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
    $(7, b, 3);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: { x: '2' }
 - 3: 'x'
 - 4: 7, { x: '7' }, 3
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
