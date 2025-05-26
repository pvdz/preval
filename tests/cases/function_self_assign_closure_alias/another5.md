# Preval test case

# another5.md

> Function self assign closure alias > Another5

## Input

`````js filename=intro
let zzzz = function () {
  debugger;
  a = [1, 2, 3];
  return a;
};
let a = undefined;
const x = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
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
  a = [1, 2, 3];
  return a;
};
let a = undefined;
const x = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
`````


## Todos triggered


- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
