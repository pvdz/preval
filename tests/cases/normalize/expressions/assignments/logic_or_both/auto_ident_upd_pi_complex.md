# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = ++$($(b)).x) || (a = ++$($(b)).x));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam$1 /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$1);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
  $(tmpUpdInc);
  $(tmpUpdInc, b);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(b);
  const tmpUpdObj$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpUpdProp$1 /*:unknown*/ = tmpUpdObj$1.x;
  const tmpUpdNum$1 /*:number*/ = $coerce(tmpUpdProp$1, `number`);
  const tmpUpdInc$4 /*:number*/ = tmpUpdNum$1 + 1;
  tmpUpdObj$1.x = tmpUpdInc$4;
  $(tmpUpdInc$4);
  $(tmpUpdInc$4, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) + 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc) {
  $(tmpUpdInc);
  $(tmpUpdInc, b);
} else {
  const tmpUpdObj$1 = $($(b));
  const tmpUpdInc$4 = $coerce(tmpUpdObj$1.x, `number`) + 1;
  tmpUpdObj$1.x = tmpUpdInc$4;
  $(tmpUpdInc$4);
  $(tmpUpdInc$4, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
if (f) {
  $( f );
  $( f, a );
}
else {
  const g = $( a );
  const h = $( g );
  const i = h.x;
  const j = $coerce( i, "number" );
  const k = j + 1;
  h.x = k;
  $( k );
  $( k, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = $(b);
const tmpUpdObj = $(tmpCalleeParam$1);
const tmpUpdProp = tmpUpdObj.x;
const tmpUpdNum = $coerce(tmpUpdProp, `number`);
const tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
a = tmpUpdInc;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  let tmpCalleeParam$3 = $(b);
  const tmpUpdObj$1 = $(tmpCalleeParam$3);
  const tmpUpdProp$1 = tmpUpdObj$1.x;
  const tmpUpdNum$1 = $coerce(tmpUpdProp$1, `number`);
  const tmpUpdInc$1 = tmpUpdNum$1 + 1;
  tmpUpdObj$1.x = tmpUpdInc$1;
  const tmpNestedComplexRhs = tmpUpdInc$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2
 - 4: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
