# Preval test case

# write_write_read_branch.md

> Assigns > Write write read branch
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
if ($(10)) $(x, 'branch')
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  $(x, `branch`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const x = $(2);
$(x);
if ($(10)) {
  $(x, `branch`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
const b = $( 10 );
if (b) {
  $( a, "branch" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 10
 - 5: 2, 'branch'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
