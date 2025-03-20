# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) && $($)(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpIfTest /*:unknown*/ = tmpCallComplexCallee(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallComplexCallee$1 /*:unknown*/ = $($);
  tmpCallComplexCallee$1(1);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
const tmpIfTest = tmpCallComplexCallee(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallComplexCallee$1 = $($);
  tmpCallComplexCallee$1(1);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = $( $ );
  d( 1 );
  $( c );
}
else {
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
