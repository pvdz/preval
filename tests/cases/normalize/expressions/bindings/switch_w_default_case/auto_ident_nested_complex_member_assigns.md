# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident nested complex member assigns
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = 3;

    let a = ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c);
    $(a, b, c);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(tmpClusterSSA_b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
const varInitAssignLhsComputedObj$3 /*:unknown*/ = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
const varInitAssignLhsComputedObj$5 /*:unknown*/ = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
const varInitAssignLhsComputedObj$7 /*:unknown*/ = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
$(3, tmpClusterSSA_b, 3);
$(`fail1`);
$(`fail2`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_b = { x: 1 };
const tmpNestedAssignComMemberObj = $(tmpClusterSSA_b);
const tmpNestedAssignComMemberProp = $(`x`);
const varInitAssignLhsComputedObj = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp$1 = $(`x`);
const varInitAssignLhsComputedObj$3 = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp$3 = $(`x`);
const varInitAssignLhsComputedObj$5 = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp$5 = $(`x`);
const varInitAssignLhsComputedObj$7 = $(tmpClusterSSA_b);
const varInitAssignLhsComputedProp$7 = $(`x`);
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
$(3, tmpClusterSSA_b, 3);
$(`fail1`);
$(`fail2`);
`````

## Pre Normal


`````js filename=intro
{
  let b;
  let c;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      (b = { x: 1 }), (c = 3);
      a = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c;
      $(a, b, c);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`fail1`);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`fail2`);
    }
  }
}
`````

## Normalized


`````js filename=intro
let b = undefined;
let c = undefined;
let a = undefined;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  b = { x: 1 };
  c = 3;
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(b);
  const varInitAssignLhsComputedProp$1 = $(`x`);
  const varInitAssignLhsComputedObj$3 = $(b);
  const varInitAssignLhsComputedProp$3 = $(`x`);
  const varInitAssignLhsComputedObj$5 = $(b);
  const varInitAssignLhsComputedProp$5 = $(`x`);
  const varInitAssignLhsComputedObj$7 = $(b);
  const varInitAssignLhsComputedProp$7 = $(`x`);
  const varInitAssignLhsComputedRhs$7 = c;
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
  const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
  const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
  const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(tmpNestedPropAssignRhs, b, c);
} else {
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $(`fail2`);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = $( a );
const e = $( "x" );
const f = $( a );
const g = $( "x" );
const h = $( a );
const i = $( "x" );
const j = $( a );
const k = $( "x" );
const l = $( a );
const m = $( "x" );
l[m] = 3;
j[k] = 3;
h[i] = 3;
f[g] = 3;
d[e] = 3;
b[c] = 3;
$( 3, a, 3 );
$( "fail1" );
$( "fail2" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { x: '1' }
 - 6: 'x'
 - 7: { x: '1' }
 - 8: 'x'
 - 9: { x: '1' }
 - 10: 'x'
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 3, { x: '3' }, 3
 - 14: 'fail1'
 - 15: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
