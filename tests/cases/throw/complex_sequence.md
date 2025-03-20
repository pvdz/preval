# Preval test case

# complex_sequence.md

> Throw > Complex sequence
>
> Returning a sequence that ends in a simple node

## Input

`````js filename=intro
function f(){ 
  throw ($(1), $(2), $(3));
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpThrowArg /*:unknown*/ = $(3);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpThrowArg = $(3);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
throw a;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: ('<crash[ 3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
