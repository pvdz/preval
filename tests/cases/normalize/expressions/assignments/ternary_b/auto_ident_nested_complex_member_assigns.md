# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  $(1)
    ? (a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
        $("x")
      ] = $(b)[$("x")] = c)
    : $(200)
);
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
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
  $(3);
  $(3, b, 3);
} else {
  const tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
if (tmpIfTest) {
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
  $(3);
  $(3, b, 3);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, b, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
if (a) {
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
  $( 3 );
  $( 3, b, 3 );
}
else {
  const o = $( 200 );
  $( o );
  const p = {
    a: 999,
    b: 1000,
  };
  $( p, b, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
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
  const tmpNestedComplexRhs = tmpInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b, c);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
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
 - 14: 3
 - 15: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
