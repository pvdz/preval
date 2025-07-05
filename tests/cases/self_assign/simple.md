# Preval test case

# simple.md

> Self assign > Simple
>
> Cute. Spotted in the wild.

## Input

`````js filename=intro
let f/*:()=>unknown*/ = function() {
  debugger;
  f = function() {
    debugger;
    return undefined;
  };
  return undefined;
};
$(f('a', 1));
$(f(100, /foo/));
`````


## Settled


`````js filename=intro
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  f = function () {
    debugger;
    return undefined;
  };
  return undefined;
};
let tmpCalleeParam = f(`a`, 1);
$(tmpCalleeParam);
const tmpCallCallee = f;
let tmpCalleeParam$3 = new $regex_constructor(`foo`, ``);
let tmpCalleeParam$1 = f(100, tmpCalleeParam$3);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
