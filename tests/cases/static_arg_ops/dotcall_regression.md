# Preval test case

# dotcall_regression.md

> Static arg ops > Dotcall regression
>
>

## Input

`````js filename=intro
const f = function($$0) {
  const arg = $$0;
  const thisAlias = this; // Relevant for repro to keep
  debugger;
  const test = ~arg;
  if (test) {
    main();
  }
};
// For repro it was important to dotcall here
$dotCall(f, undefined, '', -1);
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
const f = function ($$0) {
  const tmpPrevalAliasThis = this;
  let $dlr_$$0 = $$0;
  debugger;
  const arg = $dlr_$$0;
  const thisAlias = tmpPrevalAliasThis;
  const test = ~arg;
  if (test) {
    main();
    return undefined;
  } else {
    return undefined;
  }
};
$dotCall(f, undefined, ``, -1);
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
