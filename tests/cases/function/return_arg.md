# Preval test case

# return_arg.md

> Function > Return arg
>
> Function that its own arg

The function is pure but Preval will have to figure out how to properly inline this.

This specific case can be coded against, but the generic case will probably be a little more challenging.

## Input

`````js filename=intro
function f(x) {
  return x;
}
$(f(1));
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  return x;
};
let tmpCalleeParam = f(1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
