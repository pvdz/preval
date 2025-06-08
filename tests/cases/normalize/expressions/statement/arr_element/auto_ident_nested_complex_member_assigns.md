# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Arr element > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
  b
)[$("x")] = c) +
  ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
    b
  )[$("x")] = c);
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
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
const tmpInitAssignLhsComputedObj$9 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$9 /*:unknown*/ = $(`x`);
tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = 3;
tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
const tmpInitAssignLhsComputedObj$11 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$11 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$13 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$13 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$15 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$15 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$17 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$17 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$19 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$19 /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$21 /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp$21 /*:unknown*/ = $(`x`);
tmpInitAssignLhsComputedObj$21[tmpInitAssignLhsComputedProp$21] = 3;
tmpInitAssignLhsComputedObj$19[tmpInitAssignLhsComputedProp$19] = 3;
tmpInitAssignLhsComputedObj$17[tmpInitAssignLhsComputedProp$17] = 3;
tmpInitAssignLhsComputedObj$15[tmpInitAssignLhsComputedProp$15] = 3;
tmpInitAssignLhsComputedObj$13[tmpInitAssignLhsComputedProp$13] = 3;
tmpInitAssignLhsComputedObj$11[tmpInitAssignLhsComputedProp$11] = 3;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
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
const tmpInitAssignLhsComputedObj$9 = $(b);
const tmpInitAssignLhsComputedProp$9 = $(`x`);
tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = 3;
tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = 3;
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = 3;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = 3;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = 3;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
const tmpInitAssignLhsComputedObj$11 = $(b);
const tmpInitAssignLhsComputedProp$11 = $(`x`);
const tmpInitAssignLhsComputedObj$13 = $(b);
const tmpInitAssignLhsComputedProp$13 = $(`x`);
const tmpInitAssignLhsComputedObj$15 = $(b);
const tmpInitAssignLhsComputedProp$15 = $(`x`);
const tmpInitAssignLhsComputedObj$17 = $(b);
const tmpInitAssignLhsComputedProp$17 = $(`x`);
const tmpInitAssignLhsComputedObj$19 = $(b);
const tmpInitAssignLhsComputedProp$19 = $(`x`);
const tmpInitAssignLhsComputedObj$21 = $(b);
const tmpInitAssignLhsComputedProp$21 = $(`x`);
tmpInitAssignLhsComputedObj$21[tmpInitAssignLhsComputedProp$21] = 3;
tmpInitAssignLhsComputedObj$19[tmpInitAssignLhsComputedProp$19] = 3;
tmpInitAssignLhsComputedObj$17[tmpInitAssignLhsComputedProp$17] = 3;
tmpInitAssignLhsComputedObj$15[tmpInitAssignLhsComputedProp$15] = 3;
tmpInitAssignLhsComputedObj$13[tmpInitAssignLhsComputedProp$13] = 3;
tmpInitAssignLhsComputedObj$11[tmpInitAssignLhsComputedProp$11] = 3;
$({ a: 999, b: 1000 }, b, 3);
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
const n = $( a );
const o = $( "x" );
const p = $( a );
const q = $( "x" );
const r = $( a );
const s = $( "x" );
const t = $( a );
const u = $( "x" );
const v = $( a );
const w = $( "x" );
const x = $( a );
const y = $( "x" );
x[y] = 3;
v[w] = 3;
t[u] = 3;
r[s] = 3;
p[q] = 3;
n[o] = 3;
const z = {
  a: 999,
  b: 1000,
};
$( z, a, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
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
const tmpInitAssignLhsComputedObj$9 = $(b);
const tmpInitAssignLhsComputedProp$9 = $(`x`);
const tmpInitAssignLhsComputedRhs$9 = c;
tmpInitAssignLhsComputedObj$9[tmpInitAssignLhsComputedProp$9] = tmpInitAssignLhsComputedRhs$9;
const tmpInitAssignLhsComputedRhs$7 = tmpInitAssignLhsComputedRhs$9;
tmpInitAssignLhsComputedObj$7[tmpInitAssignLhsComputedProp$7] = tmpInitAssignLhsComputedRhs$7;
const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
const tmpBinBothLhs = tmpInitAssignLhsComputedRhs;
const tmpInitAssignLhsComputedObj$11 = $(b);
const tmpInitAssignLhsComputedProp$11 = $(`x`);
const tmpInitAssignLhsComputedObj$13 = $(b);
const tmpInitAssignLhsComputedProp$13 = $(`x`);
const tmpInitAssignLhsComputedObj$15 = $(b);
const tmpInitAssignLhsComputedProp$15 = $(`x`);
const tmpInitAssignLhsComputedObj$17 = $(b);
const tmpInitAssignLhsComputedProp$17 = $(`x`);
const tmpInitAssignLhsComputedObj$19 = $(b);
const tmpInitAssignLhsComputedProp$19 = $(`x`);
const tmpInitAssignLhsComputedObj$21 = $(b);
const tmpInitAssignLhsComputedProp$21 = $(`x`);
const tmpInitAssignLhsComputedRhs$21 = c;
tmpInitAssignLhsComputedObj$21[tmpInitAssignLhsComputedProp$21] = tmpInitAssignLhsComputedRhs$21;
const tmpInitAssignLhsComputedRhs$19 = tmpInitAssignLhsComputedRhs$21;
tmpInitAssignLhsComputedObj$19[tmpInitAssignLhsComputedProp$19] = tmpInitAssignLhsComputedRhs$19;
const tmpInitAssignLhsComputedRhs$17 = tmpInitAssignLhsComputedRhs$19;
tmpInitAssignLhsComputedObj$17[tmpInitAssignLhsComputedProp$17] = tmpInitAssignLhsComputedRhs$17;
const tmpInitAssignLhsComputedRhs$15 = tmpInitAssignLhsComputedRhs$17;
tmpInitAssignLhsComputedObj$15[tmpInitAssignLhsComputedProp$15] = tmpInitAssignLhsComputedRhs$15;
const tmpInitAssignLhsComputedRhs$13 = tmpInitAssignLhsComputedRhs$15;
tmpInitAssignLhsComputedObj$13[tmpInitAssignLhsComputedProp$13] = tmpInitAssignLhsComputedRhs$13;
const tmpInitAssignLhsComputedRhs$11 = tmpInitAssignLhsComputedRhs$13;
tmpInitAssignLhsComputedObj$11[tmpInitAssignLhsComputedProp$11] = tmpInitAssignLhsComputedRhs$11;
const tmpBinBothRhs = tmpInitAssignLhsComputedRhs$11;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b, c);
`````


## Todos triggered


None


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
 - 13: { x: '3' }
 - 14: 'x'
 - 15: { x: '3' }
 - 16: 'x'
 - 17: { x: '3' }
 - 18: 'x'
 - 19: { x: '3' }
 - 20: 'x'
 - 21: { x: '3' }
 - 22: 'x'
 - 23: { x: '3' }
 - 24: 'x'
 - 25: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
