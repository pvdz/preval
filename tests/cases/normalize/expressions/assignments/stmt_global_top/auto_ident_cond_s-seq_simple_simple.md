# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident cond s-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = (10, 20, 30) ? $(2) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(2);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(2);
  $(a);
} else {
  let tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
