# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Call > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($($(0)) || 2);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  $(2);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $($(0));
const a = { a: 999, b: 1000 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  $(2);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( b );
  $( c );
}
else {
  $( 2 );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
