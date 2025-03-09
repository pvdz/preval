# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) || $($)(1);
$(a);
`````

## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpIfTest /*:unknown*/ = tmpCallComplexCallee(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCallComplexCallee$1 /*:unknown*/ = $($);
  tmpCallComplexCallee$1(1);
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
  $(a);
} else {
  const tmpCallComplexCallee$1 = $($);
  tmpCallComplexCallee$1(1);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) || $($)(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
const tmpIfTest = tmpCallComplexCallee(1);
if (tmpIfTest) {
  $(a);
} else {
  const tmpCallComplexCallee$1 = $($);
  tmpCallComplexCallee$1(1);
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
  $( c );
}
else {
  const d = $( $ );
  d( 1 );
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
