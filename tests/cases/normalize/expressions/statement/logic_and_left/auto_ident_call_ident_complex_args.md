# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Logic and left > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1), $(2)) && $(100);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
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
  $(100);
  $(a);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(1), $(2)) && $(100);
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
  $(100);
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
  $( 100 );
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
 - 4: 100
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
