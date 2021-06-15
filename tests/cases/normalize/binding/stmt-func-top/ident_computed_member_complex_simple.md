# Preval test case

# ident_computed_member_complex_simple.md

> Normalize > Binding > Stmt-func-top > Ident computed member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = $(b)[$('x')] = c;
  $(a, b, c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 },
    c = 3;
  let a = ($(b)[$(`x`)] = c);
  $(a, b, c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 };
  let c = 3;
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
$(3, b, 3);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 'x'
 - 3: 3, { x: '3' }, 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
