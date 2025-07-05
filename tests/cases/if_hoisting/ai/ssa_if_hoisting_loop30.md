# Preval test case

# ssa_if_hoisting_loop30.md

> If hoisting > Ai > Ssa if hoisting loop30
>
> Test if_hoisting and SSA infinite loop: identical var declarations with this expressions

## Input

`````js filename=intro
function thisTest() {
  const thisFlag = $("thisFlag");
  if (thisFlag) {
    let this1 = this;
    $(this1);
  } else {
    let this2 = this;
    $(this2);
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
let thisTest = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const thisFlag = $(`thisFlag`);
  if (thisFlag) {
    let this1 = tmpPrevalAliasThis;
    $(tmpPrevalAliasThis);
    return undefined;
  } else {
    let this2 = tmpPrevalAliasThis;
    $(tmpPrevalAliasThis);
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
