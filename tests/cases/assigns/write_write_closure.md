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
const tmpClusterSSA_x /*:unknown*/ = $(2);
$(tmpClusterSSA_x);
$(tmpClusterSSA_x, `closure`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpClusterSSA_x = $(2);
$(tmpClusterSSA_x);
$(tmpClusterSSA_x, `closure`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
$( a, "closure" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(x, `closure`);
  return undefined;
};
let x = $(1);
x = $(2);
$(x);
f();
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
