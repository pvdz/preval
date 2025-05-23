# Preval test case

# write_write_closure.md

> Assigns > Write write closure
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
function f() {
  $(x, 'closure');
}
f();
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $(2);
$(x);
$(x, `closure`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const x = $(2);
$(x);
$(x, `closure`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
$( a, "closure" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2, 'closure'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
