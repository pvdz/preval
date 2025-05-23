# Preval test case

# break_loop.md

> Labels > Break loop
>
> Labels should not throw

## Input

`````js filename=intro
foo: while(true) {
  $(1);
  break foo;
}
$(2);
`````


## Settled


`````js filename=intro
$(1);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
$(2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
