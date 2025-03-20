# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $(1) ? (40, 50, 60) : $($(100));
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  $(a);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  $($(100));
  $(a);
  $(undefined);
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
  $( b );
  $( undefined );
}
else {
  const c = $( 100 );
  $( c );
  $( b );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
