# Preval test case

# ssa_if_hoisting_loop29.md

> If hoisting > Ai > Ssa if hoisting loop29
>
> Test if_hoisting and SSA infinite loop: identical var declarations with super expressions

## Input

`````js filename=intro
class TestClass {
  constructor() {
    const superTest = $("superTest");
    if (superTest) {
      let super1 = super.toString();
      $(super1);
    } else {
      let super2 = super.toString();
      $(super2);
    }
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
let TestClass = class {
  constructor() {
    debugger;
    const superTest = $(`superTest`);
    if (superTest) {
      let super1 = super.toString();
      $(super1);
      return undefined;
    } else {
      let super2 = super.toString();
      $(super2);
      return undefined;
    }
  }
};
`````


## Todos triggered


- (todo) Encountered non-ident as callee
- (todo) infertyping on a non-ident? is that a crash or bug? MemberExpression
- (todo) support expression in findInvIdentWhileSkippingNoobs: SuperMethodCall
- (todo) when we are still receiving method calls in typed tracked tricks?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
