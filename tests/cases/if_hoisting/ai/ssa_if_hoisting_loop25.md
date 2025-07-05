# Preval test case

# ssa_if_hoisting_loop25.md

> If hoisting > Ai > Ssa if hoisting loop25
>
> Test if_hoisting and SSA infinite loop: identical var declarations with yield expressions

## Input

`````js filename=intro
function* generator() {
  const gen = $("gen");
  if (gen) {
    let yield1 = yield 1;
    $(yield1);
  } else {
    let yield2 = yield 1;
    $(yield2);
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
let generator = function* () {
  debugger;
  const gen = $(`gen`);
  if (gen) {
    let yield1 = yield 1;
    $(yield1);
    return undefined;
  } else {
    let yield2 = yield 1;
    $(yield2);
    return undefined;
  }
};
`````


## Todos triggered


- (todo) support expression in findInvIdentWhileSkippingNoobs: YieldExpression
- (todo) would this not be the same as await? would we not want to infer the arg here?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
