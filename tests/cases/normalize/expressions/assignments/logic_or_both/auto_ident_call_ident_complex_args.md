# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $($(1), $(2))) || (a = $($(1), $(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
let a /*:unknown*/ = $(tmpCalleeParam$1, tmpCalleeParam$3);
if (a) {
  $(a);
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1), $(2));
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs = $($(1), $(2));
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = $($(1), $(2))) || (a = $($(1), $(2))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = $(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$5 = $(1);
  const tmpCalleeParam$7 = $(2);
  const tmpNestedComplexRhs = $(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
let c = $( a, b );
if (c) {
  $( c );
}
else {
  const d = $( 1 );
  const e = $( 2 );
  const f = $( d, e );
  c = f;
  $( f );
}
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
