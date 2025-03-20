# Preval test case

# write_read_write_branched_reads.md

> Assigns > Write read write branched reads
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
$(x, 'a');
// SSA since all future reads can only inspect this write
// In this case we cannot postpone the write since both branches will want to read it
x = $(2);
if ($(1)) $(x, 'b');
else $(x, 'c');
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
  $(tmpClusterSSA_x, `c`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), `a`);
const tmpClusterSSA_x = $(2);
if ($(1)) {
  $(tmpClusterSSA_x, `b`);
} else {
  $(tmpClusterSSA_x, `c`);
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
else {
  $( b, "c" );
}
`````


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
