# Preval test case

# unused_param_last.md

> Rest > Param > Unused > Unused param last
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(a, b, ...rest) {
  return $(a, b, 'fwep');
}
f($spy(), $spy());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy();
const tmpCalleeParam$1 /*:unknown*/ = $spy();
$(tmpCalleeParam, tmpCalleeParam$1, `fwep`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($spy(), $spy(), `fwep`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $spy();
$( a, b, "fwep" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, ...$$2 /*:array*/) {
  let a = $$0;
  let b = $$1;
  let rest = $$2;
  debugger;
  const tmpReturnArg = $(a, b, `fwep`);
  return tmpReturnArg;
};
const tmpCallCallee = f;
let tmpCalleeParam = $spy();
let tmpCalleeParam$1 = $spy();
f(tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


- (todo) drop unused rest param?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: 'Creating spy', 2, 0, ['spy', 12345]
 - 3: '<spy[1]>', '<spy[2]>', 'fwep'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
