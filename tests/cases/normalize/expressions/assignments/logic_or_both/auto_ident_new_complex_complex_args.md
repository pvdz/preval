# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) || (a = new ($($))($(1), $(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
let a /*:unknown*/ = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
if (a) {
  $(a);
} else {
  const tmpNewCallee$1 /*:unknown*/ = $($);
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
let a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
if (a) {
  $(a);
} else {
  const tmpNewCallee$1 = $($);
  const tmpCalleeParam$5 = $(1);
  const tmpCalleeParam$7 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) || (a = new ($($))($(1), $(2))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNewCallee$1 = $($);
  const tmpCalleeParam$5 = $(1);
  const tmpCalleeParam$7 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
let d = new a( b, c );
if (d) {
  $( d );
}
else {
  const e = $( $ );
  const f = $( 1 );
  const g = $( 2 );
  const h = new e( f, g );
  d = h;
  $( h );
}
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: {}
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
