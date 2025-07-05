# Preval test case

# ssa_if_hoisting_loop26.md

> If hoisting > Ai > Ssa if hoisting loop26
>
> Test if_hoisting and SSA infinite loop: identical var declarations with await expressions

## Input

`````js filename=intro
async function asyncFunc() {
  const async = $("async");
  if (async) {
    let await1 = await Promise.resolve(42);
    $(await1);
  } else {
    let await2 = await Promise.resolve(42);
    $(await2);
  }
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
let asyncFunc = async function () {
  debugger;
  const async = $(`async`);
  if (async) {
    const tmpMCF = $Promise_resolve;
    const tmpAwaitArg = $Promise_resolve(42);
    let await1 = await tmpAwaitArg;
    $(await1);
    return undefined;
  } else {
    const tmpMCF$1 = $Promise_resolve;
    const tmpAwaitArg$1 = $Promise_resolve(42);
    let await2 = await tmpAwaitArg$1;
    $(await2);
    return undefined;
  }
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
