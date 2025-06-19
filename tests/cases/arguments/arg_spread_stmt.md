# Preval test case

# arg_spread_stmt.md

> Arguments > Arg spread stmt
>
> Arguments can be spread but this should not be observable

## Input

`````js filename=intro
function f(a, b, c) {
  [...arguments]; // Can be dropped. Should be.
}
f();
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  [...tmpPrevalAliasArgumentsAny];
  return undefined;
};
f();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) harden the check for being an arguments object, a prefix check seems brittle


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
