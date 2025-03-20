# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (10, 20, $(30)) ? $(2) : $($(100))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
  $(2);
  $(undefined);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  $(undefined);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  $(2);
  $(undefined);
} else {
  $($(100));
  $(undefined);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  $( 2 );
  $( undefined );
}
else {
  const b = $( 100 );
  $( b );
  $( undefined );
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: undefined
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
