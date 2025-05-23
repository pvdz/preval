# Preval test case

# redundant_init2.md

> Binding > Promote const > Redundant init2
>
> Trying to figure out why the let x = undefined case is not being eliminated

## Input

`````js filename=intro
while (true) {
  let a = undefined;
  a = $(1);
  $(a);
  break;
}
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
a = $(1);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
