# Preval test case

# simple_sequence.md

> Throw > Simple sequence
>
> Returning a sequence that ends in a simple node

## Input

`````js filename=intro
function f(){ 
  throw ($(1), $(2), null);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
throw null;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
throw null;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
throw null;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  const tmpThrowArg = null;
  throw tmpThrowArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ null ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
