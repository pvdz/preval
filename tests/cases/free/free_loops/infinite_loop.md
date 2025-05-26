# Preval test case

# infinite_loop.md

> Free > Free loops > Infinite loop
>
> Free loop rules should probably not allow an infinite loop.

This was failing because at some point preval realizes z=false and the intermediate
step has `if (false)` when being evaluated by isFree. This led to an infinite loop
but this particular case was prevented by rejecting a trivial if-test. Let it normalize
first. It's an obvious target.

## Input

`````js filename=intro
let x = 1;
const y = $(true);
const z = $(true);
if (y) {
  while (true) {
    x = 2;
    if (z) {
      break;
    }
  }
  $(x); 
}
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(true);
$(true);
if (y) {
  $(2);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(true);
$(true);
if (y) {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
$( true );
if (a) {
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
const y = $(true);
const z = $(true);
if (y) {
  while (true) {
    x = 2;
    if (z) {
      break;
    } else {
    }
  }
  $(x);
} else {
}
`````


## Todos triggered


- (todo) do we want to support Literal as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
