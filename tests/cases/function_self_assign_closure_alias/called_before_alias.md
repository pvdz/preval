# Preval test case

# called_before_alias.md

> Function self assign closure alias > Called before alias

## Input

`````js filename=intro
let zzzz = function() {
  debugger;
  const a = [];
  zzzz = function($$0, $$1) {
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
zzzz(); // this locks it so any future calls/aliases always refer to the inner func
const x = zzzz;
zzzz() === zzzz();  // a1 === a1
x() !== x();        // a2 === a3
x() === zzzz();     // a4 === a4
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
let zzzz = function () {
  debugger;
  const a = [];
  zzzz = function ($$0, $$1) {
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
zzzz();
const x = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
