# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$($(100) && (a = ($(1), $(2), x)));
$(a, x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(1);
  $(2);
  $(1);
  $(1, 1);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(1);
  $(2);
  $(1);
  $(1, 1);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( 1 );
  $( 2 );
  $( 1 );
  $( 1, 1 );
}
else {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b, 1 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
