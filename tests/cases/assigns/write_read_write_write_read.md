# Preval test case

# write_read_write_write_read.md

> Assigns > Write read write write read
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2);
x = $(3);
$(x, 'b');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x, `a`);
$(2);
const tmpClusterSSA_x /*:unknown*/ = $(3);
$(tmpClusterSSA_x, `b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), `a`);
$(2);
$($(3), `b`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, "a" );
$( 2 );
const b = $( 3 );
$( b, "b" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 2
 - 4: 3
 - 5: 3, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
