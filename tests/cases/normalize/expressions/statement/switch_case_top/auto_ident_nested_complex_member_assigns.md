# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Switch case top > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c;
}
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const b /*:object*/ /*truthy*/ = { x: 1 };
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
  tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
  tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  $(a, b, 3);
} else {
  $(a, b, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const b = { x: 1 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(b);
  const tmpInitAssignLhsComputedProp$1 = $(`x`);
  const tmpInitAssignLhsComputedObj$3 = $(b);
  const tmpInitAssignLhsComputedProp$3 = $(`x`);
  const tmpInitAssignLhsComputedObj$5 = $(b);
  const tmpInitAssignLhsComputedProp$5 = $(`x`);
  const tmpInitAssignLhsComputedObj$7 = $(b);
  const tmpInitAssignLhsComputedProp$7 = $(`x`);
  tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
  tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  $(a, b, 3);
} else {
  $(a, b, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = { x: 1 };
const e = {
  a: 999,
  b: 1000,
};
if (c) {
  const f = $( d );
  const g = $( "x" );
  const h = $( d );
  const i = $( "x" );
  const j = $( d );
  const k = $( "x" );
  const l = $( d );
  const m = $( "x" );
  const n = $( d );
  const o = $( "x" );
  const p = $( d );
  const q = $( "x" );
  p[q] = 3;
  n[o] = 3;
  l[m] = 3;
  j[k] = 3;
  h[i] = 3;
  f[g] = 3;
  $( e, d, 3 );
}
else {
  $( e, d, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`x`);
  const tmpInitAssignLhsComputedObj$1 = $(b);
  const tmpInitAssignLhsComputedProp$1 = $(`x`);
  const tmpInitAssignLhsComputedObj$3 = $(b);
  const tmpInitAssignLhsComputedProp$3 = $(`x`);
  const tmpInitAssignLhsComputedObj$5 = $(b);
  const tmpInitAssignLhsComputedProp$5 = $(`x`);
  const tmpInitAssignLhsComputedObj$7 = $(b);
  const tmpInitAssignLhsComputedProp$7 = $(`x`);
  const tmpInitAssignLhsComputedRhs$7 = c;
  tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = tmpInitAssignLhsComputedRhs$7;
  const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
  tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
  const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
  tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
  const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
  tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
  const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  const tmpAssignComputedRhs = tmpInitAssignLhsComputedRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b, c);
} else {
  $(a, b, c);
}
`````


## Todos triggered


None


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
 - 15: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
