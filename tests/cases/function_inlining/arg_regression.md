# Preval test case

# arg_regression.md

> Function inlining > Arg regression
>
> Chasing monsters

## Input

`````js filename=intro
let f = function () {
  let x = undefined;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (x0, x1) {
    let x$1 = x0;
    let tmpIfTest$1 = x1;
    x$1 = 10;
    const tmpReturnArg = tmpBranchingC(x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (x0, x1) {
    let x$2 = x0;
    let tmpIfTest$2 = x1;
    const tmpReturnArg$1 = tmpBranchingC(x$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (x0, x1) {
    let x$3 = x0;
    let tmpIfTest$3 = x1;
    return x$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(x, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(10);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(10);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 10 );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  const tmpBranchingA = function ($$0, $$1) {
    let x0 = $$0;
    let x1 = $$1;
    debugger;
    let x$1 = x0;
    let tmpIfTest$1 = x1;
    x$1 = 10;
    const tmpReturnArg = tmpBranchingC(x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let x0$1 = $$0;
    let x1$1 = $$1;
    debugger;
    let x$2 = x0$1;
    let tmpIfTest$2 = x1$1;
    const tmpReturnArg$1 = tmpBranchingC(x$2, x1$1);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let x0$3 = $$0;
    let x1$3 = $$1;
    debugger;
    let x$3 = x0$3;
    let tmpIfTest$3 = x1$3;
    return x$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(x, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
