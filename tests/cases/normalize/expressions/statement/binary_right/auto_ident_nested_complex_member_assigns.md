# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Binary right > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(100) +
  ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
    b
  )[$("x")] = c);
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
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
tmpBinBothLhs + 0;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
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
tmpBinBothLhs + 0;
$({ a: 999, b: 1000 }, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = $( b );
const d = $( "x" );
const e = $( b );
const f = $( "x" );
const g = $( b );
const h = $( "x" );
const i = $( b );
const j = $( "x" );
const k = $( b );
const l = $( "x" );
const m = $( b );
const n = $( "x" );
m[n] = 3;
k[l] = 3;
i[j] = 3;
g[h] = 3;
e[f] = 3;
c[d] = 3;
a + 0;
const o = {
  a: 999,
  b: 1000,
};
$( o, b, 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { x: '1' }
 - 5: 'x'
 - 6: { x: '1' }
 - 7: 'x'
 - 8: { x: '1' }
 - 9: 'x'
 - 10: { x: '1' }
 - 11: 'x'
 - 12: { x: '1' }
 - 13: 'x'
 - 14: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
