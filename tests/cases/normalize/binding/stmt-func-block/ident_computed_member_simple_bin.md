# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > Stmt-func-block > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= b[$('x')] = c + d;
  $(a, b, c);
}
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let b = { x: 2 },
      c = 3,
      d = 4;
    let a = (b[$(`x`)] = c + d);
    $(a, b, c);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = { x: 2 };
    let c = 3;
    let d = 4;
    const varInitAssignLhsComputedObj = b;
    const varInitAssignLhsComputedProp = $(`x`);
    const varInitAssignLhsComputedRhs = c + d;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    let a = varInitAssignLhsComputedRhs;
    $(a, b, c);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const varInitAssignLhsComputedProp = $(`x`);
  const b = { x: 2 };
  b[varInitAssignLhsComputedProp] = 7;
  $(7, b, 3);
} else {
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'x'
 - 3: 7, { x: '7' }, 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
