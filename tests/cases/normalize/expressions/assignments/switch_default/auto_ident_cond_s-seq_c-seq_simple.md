# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (10, 20, 30) ? (40, 50, $(60)) : $($(100));
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpClusterSSA_a /*:unknown*/ = $(60);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(60));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 60 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
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
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
