# Preval test case

# write_read_write_branched_read.md

> Assigns > Write read write branched read
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
$(x, 'a');
// SSA since all future reads can only inspect this write
// We could potentially even postpone the write if we can determine the value to be static
x = $(2);
if ($(1)) $(x, 'b');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x, `a`);
const tmpClusterSSA_x /*:unknown*/ = $(2);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(tmpClusterSSA_x, `b`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), `a`);
const tmpClusterSSA_x = $(2);
if ($(1)) {
  $(tmpClusterSSA_x, `b`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, "a" );
const b = $( 2 );
const c = $( 1 );
if (c) {
  $( b, "b" );
}
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
 - 4: 1
 - 5: 2, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
