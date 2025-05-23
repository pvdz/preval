# Preval test case

# no_arg.md

> Throw > No arg
>
> Returning a sequence that ends in a simple node

## Input

`````js filename=intro
function f(){ 
  throw 'x';
}
$(f());
`````


## Settled


`````js filename=intro
throw `x`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `x`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "x";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  throw `x`;
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
 - eval returned: ('<crash[ x ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
