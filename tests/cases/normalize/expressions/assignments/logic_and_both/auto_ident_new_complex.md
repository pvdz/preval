# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new ($($))(1)) && (a = new ($($))(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
let a /*:unknown*/ = new tmpNewCallee(1);
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  const tmpNewCallee$1 /*:unknown*/ = $($);
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
let a = new tmpNewCallee(1);
const tmpCalleeParam = a;
if (a) {
  const tmpNewCallee$1 = $($);
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new ($($))(1)) && (a = new ($($))(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
a = new tmpNewCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNewCallee$1 = $($);
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
let b = new a( 1 );
const c = b;
if (b) {
  const d = $( $ );
  const e = new d( 1 );
  b = e;
  $( e );
}
else {
  $( c );
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: {}
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
