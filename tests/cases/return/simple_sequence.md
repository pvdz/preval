# Preval test case

# simple_sequence.md

> Return > Simple sequence
>
> Returning a sequence that ends in a simple node

## Input

`````js filename=intro
function f(){ 
  return ($(1), $(2), null);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
$(null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(null);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( null );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  return null;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
