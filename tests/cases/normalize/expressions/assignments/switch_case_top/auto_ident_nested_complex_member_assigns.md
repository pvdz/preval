# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c;
}
$(a, b, c);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  $(3, b, 3);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b, 3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const b = { x: 1 };
if (tmpIfTest) {
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
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  $(3, b, 3);
} else {
  $({ a: 999, b: 1000 }, b, 3);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c;
  } else {
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
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
  $(a, b, c);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = { x: 1 };
if (c) {
  const e = $( d );
  const f = $( "x" );
  const g = $( d );
  const h = $( "x" );
  const i = $( d );
  const j = $( "x" );
  const k = $( d );
  const l = $( "x" );
  const m = $( d );
  const n = $( "x" );
  const o = $( d );
  const p = $( "x" );
  o[p] = 3;
  m[n] = 3;
  k[l] = 3;
  i[j] = 3;
  g[h] = 3;
  e[f] = 3;
  $( 3, d, 3 );
}
else {
  const q = {
    a: 999,
    b: 1000,
  };
  $( q, d, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
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
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
