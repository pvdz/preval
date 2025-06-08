# Preval test case

# arg.md

> Tofix > arg
>
> This was causing a problem when arguments was passed on in a call.

exiting test case.

dotcall .apply should fold up come on
create a new test where it's not recursive, but solve this recursive version as well

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments);
}
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
let f = function () {
  const tmpPrevalAliasThis = this;
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpMCF = f.apply;
  $dotCall(tmpMCF, f, `apply`, tmpPrevalAliasThis, tmpPrevalAliasArgumentsAny);
  return undefined;
};
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
