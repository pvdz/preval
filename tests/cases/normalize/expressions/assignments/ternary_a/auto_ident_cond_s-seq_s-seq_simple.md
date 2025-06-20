# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, 30) ? (40, 50, 60) : $($(100))) ? $(100) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(60);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(60);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 60 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  a = 60;
} else {
  let tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
const tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
