# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, 30) ? $(2) : $($(100))) + ((10, 20, 30) ? $(2) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpBinBothLhs /*:unknown*/ = $(2);
const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $(2);
tmpClusterSSA_tmpBinBothLhs + tmpClusterSSA_tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2) + $(2);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( 2 );
a + b;
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpBinBothLhs = $(2);
} else {
  let tmpCalleeParam = $(100);
  tmpBinBothLhs = $(tmpCalleeParam);
}
let tmpBinBothRhs = undefined;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  tmpBinBothRhs = $(2);
} else {
  let tmpCalleeParam$1 = $(100);
  tmpBinBothRhs = $(tmpCalleeParam$1);
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
