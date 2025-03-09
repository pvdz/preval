# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1), $(2)) && $($(1), $(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  $(tmpCalleeParam$3, tmpCalleeParam$5);
  $(a);
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $($(1), $(2));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $($(1), $(2));
  $(a);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(1), $(2)) && $($(1), $(2));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpIfTest = $(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
  const tmpCalleeParam$3 = $(1);
  const tmpCalleeParam$5 = $(2);
  $(tmpCalleeParam$3, tmpCalleeParam$5);
  $(a);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  const e = $( 1 );
  const f = $( 2 );
  $( e, f );
  $( d );
}
else {
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 2
 - 6: 1, 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
