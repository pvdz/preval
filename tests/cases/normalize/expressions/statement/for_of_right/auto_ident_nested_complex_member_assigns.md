# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > For of right > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (let x of ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
  $("x")
] = $(b)[$("x")] = c));
$(a, b, c);
`````


## Settled


`````js filename=intro
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
const tmpForOfGenNext /*:unknown*/ = $forOf(3);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
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
const tmpForOfGenNext = $forOf(3);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
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
const n = $forOf( 3 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const o = n();
  const p = o.done;
  if (p) {
    break;
  }
  else {
    o.value;
  }
}
const q = {
  a: 999,
  b: 1000,
};
$( q, a, 3 );
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
