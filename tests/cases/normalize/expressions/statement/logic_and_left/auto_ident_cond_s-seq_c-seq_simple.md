# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Logic and left > Auto ident cond s-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, 30) ? (40, 50, $(60)) : $($(100))) && $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(60);
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
const tmpIfTest = $(60);
const a = { a: 999, b: 1000 };
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
const a = $( 60 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b );
}
else {
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
