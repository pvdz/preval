# Preval test case

# arguments_regression.md

> One timers > Arguments regression
>
> x

## Input

`````js filename=intro
let bool = true;
const f = function () {
  const tmpArgs = arguments; // Code would crash because this got reduced to a statement expression of `arguments` which broke a function header invariant in `inline_constants.mjs`
  if (bool) {
    unknown();
    bool = false;
  }
};
f();
`````


## Settled


`````js filename=intro
unknown();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown();
`````


## PST Settled
With rename=true

`````js filename=intro
unknown();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let bool = true;
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpArgs = tmpPrevalAliasArgumentsAny;
  if (bool) {
    unknown();
    bool = false;
    return undefined;
  } else {
    return undefined;
  }
};
f();
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
