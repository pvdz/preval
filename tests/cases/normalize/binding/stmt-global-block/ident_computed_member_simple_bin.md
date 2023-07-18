# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > Stmt-global-block > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3, d = 4;
  let a = b[$('x')] = c + d;
  $(a, b, c);
}
`````

## Pre Normal

`````js filename=intro
if ($(true)) {
  let b = { x: 2 },
    c = 3,
    d = 4;
  let a = (b[$(`x`)] = c + d);
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
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
} else {
}
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
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( "x" );
  const c = { x: 2 };
  c[b] = 7;
  $( 7, c, 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'x'
 - 3: 7, { x: '7' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
