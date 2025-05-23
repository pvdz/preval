# Preval test case

# break_problem_false3.md

> Flow > Break problem false3
>
> Must track all labeled breaks when checking if a binding is mutated

## Input

`````js filename=intro
let f = function () {
  let x = `fail`;
  const tmpLabeledBlockFunc = function ($$0, ...$$1) {
    let x$3 = $$1;
    debugger;
    const tmpLabeledBlockFunc$1 = function ($$0) {
      let x$7 = $$0;
      debugger;
      const tmpIfTest$3 = $(false);
      if (tmpIfTest$3) {
        const tmpReturnArg$1 = tmpAfterLabel(x$7);
        return tmpReturnArg$1;
      } else {
        const tmpReturnArg$3 = tmpAfterLabel$1(x$7);
        return tmpReturnArg$3;
      }
    };
    const tmpAfterLabel$1 = function ($$0) {
      let x$5 = $$0;
      debugger;
      x$5 = `pass`;
      const tmpReturnArg$5 = tmpAfterLabel(x$5);
      return tmpReturnArg$5;
    };
    const tmpReturnArg$7 = tmpLabeledBlockFunc$1(x$3);
    return tmpReturnArg$7;
  };
  const tmpAfterLabel = function ($$0) {
    let x$1 = $$0;
    debugger;
    $(x$1);
    return undefined;
  };
  const tmpReturnArg$9 = tmpLabeledBlockFunc(x);
  return tmpReturnArg$9;
};
f();
`````


## Settled


`````js filename=intro
const tmpIfTest$3 /*:unknown*/ = $(false);
if (tmpIfTest$3) {
  const $dlr_$$1 /*:array*/ = [];
  $($dlr_$$1);
} else {
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  $([]);
} else {
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  const b = [];
  $( b );
}
else {
  $( "pass" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  const tmpLabeledBlockFunc = function ($$0, ...$$1 /*:array*/) {
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    let x$3 = $dlr_$$1;
    const tmpLabeledBlockFunc$1 = function ($$0) {
      let $dlr_$$2 = $$0;
      debugger;
      let x$7 = $dlr_$$2;
      const tmpIfTest$3 = $(false);
      if (tmpIfTest$3) {
        const tmpReturnArg$1 = tmpAfterLabel(x$7);
        return tmpReturnArg$1;
      } else {
        const tmpReturnArg$3 = tmpAfterLabel$1(x$7);
        return tmpReturnArg$3;
      }
    };
    const tmpAfterLabel$1 = function ($$0) {
      let $dlr_$$4 = $$0;
      debugger;
      let x$5 = $dlr_$$4;
      x$5 = `pass`;
      const tmpReturnArg$5 = tmpAfterLabel(x$5);
      return tmpReturnArg$5;
    };
    const tmpReturnArg$7 = tmpLabeledBlockFunc$1(x$3);
    return tmpReturnArg$7;
  };
  const tmpAfterLabel = function ($$0) {
    let $dlr_$$6 = $$0;
    debugger;
    let x$1 = $dlr_$$6;
    $($dlr_$$6);
    return undefined;
  };
  const tmpReturnArg$9 = tmpLabeledBlockFunc(x);
  return tmpReturnArg$9;
};
f();
`````


## Todos triggered


- (todo) drop unused rest param?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
