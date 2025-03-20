# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && $($(1))) || (1 && $($(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  $(tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $($(1));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $($(1));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  const d = $( 1 );
  $( d );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
