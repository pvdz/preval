# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? 1 && $($(1)) : $(200);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  $(tmpCalleeParam);
  $(a);
} else {
  $(200);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $($(1));
  $(a);
} else {
  $(200);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 1 );
  $( c );
  $( b );
}
else {
  $( 200 );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
