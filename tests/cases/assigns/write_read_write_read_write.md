# Preval test case

# write_read_write_read_write.md

> Assigns > Write read write read write
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2); // SSA since all future reads can only inspect this write
$(x, 'b');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x, `a`);
const tmpClusterSSA_x /*:unknown*/ = $(2);
$(tmpClusterSSA_x, `b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), `a`);
$($(2), `b`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, "a" );
const b = $( 2 );
$( b, "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
$(x, `a`);
x = $(2);
$(x, `b`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 2
 - 4: 2, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
