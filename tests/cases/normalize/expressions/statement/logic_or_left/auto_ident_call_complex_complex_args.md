# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Logic or left > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($)($(1), $(2)) || $(100);
$(a);
`````

## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpIfTest /*:unknown*/ = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(100);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = $($);
const tmpIfTest = tmpCallCallee($(1), $(2));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(100);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($)($(1), $(2)) || $(100);
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
  $(a);
} else {
  $(100);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  $( e );
}
else {
  $( 100 );
  $( e );
}
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
