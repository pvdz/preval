# Preval test case

# ident_member_complex_bin.md

> Normalize > Binding > Stmt-func-block > Ident member complex bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= $(b).x = c + d;
  $(a, b, c);
}
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  if ($(true)) {
    let b = { x: 2 },
      c = 3,
      d = 4;
    let a = ($(b).x = c + d);
    $(a, b, c);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = { x: 2 };
    let c = 3;
    let d = 4;
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedRhs = c + d;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    let a = varInitAssignLhsComputedRhs;
    $(a, b, c);
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const b = { x: 2 };
    const varInitAssignLhsComputedObj = $(b);
    varInitAssignLhsComputedObj.x = 7;
    $(7, b, 3);
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: { x: '2' }
 - 3: 7, { x: '7' }, 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
