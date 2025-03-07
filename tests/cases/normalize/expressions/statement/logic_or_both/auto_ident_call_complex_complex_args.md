# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($)($(1), $(2)) || $($)($(1), $(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpIfTest /*:unknown*/ = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 /*:unknown*/ = $($);
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
if (!tmpCallCallee(tmpCalleeParam, $(2))) {
  const tmpCallCallee$1 = $($);
  tmpCallCallee$1($(1), $(2));
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($)($(1), $(2)) || $($)($(1), $(2));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpIfTest = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $($);
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$5 = $(2);
  tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
if (d) {

}
else {
  const e = $( $ );
  const f = $( 1 );
  const g = $( 2 );
  e( f, g );
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
