# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Call > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && 2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  $(2);
  $(2);
} else {
  $(a);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
if (a) {
  $(2);
  $(2);
} else {
  $(a);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && 2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
a = $(tmpCalleeParam$1);
if (a) {
  a = 2;
} else {
}
let tmpCalleeParam = a;
$(a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  $( 2 );
  $( 2 );
}
else {
  $( b );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
