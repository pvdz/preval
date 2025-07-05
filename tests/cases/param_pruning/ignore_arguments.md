# Preval test case

# ignore_arguments.md

> Param pruning > Ignore arguments
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y, z) {
  return $(!!arguments, x, z);
}
f();
`````


## Settled


`````js filename=intro
$(true, undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true, undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true, undefined, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  const tmpUnaryArg = !tmpPrevalAliasArgumentsAny;
  let tmpCalleeParam = !tmpUnaryArg;
  let tmpCalleeParam$1 = x;
  let tmpCalleeParam$3 = z;
  const tmpReturnArg = $(tmpCalleeParam, tmpCalleeParam$1, z);
  return tmpReturnArg;
};
f();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
