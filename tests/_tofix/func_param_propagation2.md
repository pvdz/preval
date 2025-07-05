# Preval test case

# func_param_propagation2.md

> Tofix > func param propagation2
>
> If we would move that tail return trampo into both if-branches then it would remove the b...

## Input

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare$1 = $$0;
  debugger;
  let b = `bar`;
  const tmpIfTest$1 = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg = [`x`, b];
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(`y`);
$(tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
const f /*:(primitive, boolean)=>array*/ = function ($$0, $$1) {
  const $dlr_$$1 /*:primitive*/ = $$0;
  const tmpOutlinedParam /*:boolean*/ = $$1;
  debugger;
  let b /*:primitive*/ /*ternaryConst*/ = `bar`;
  if (tmpOutlinedParam) {
  } else {
    b = $dlr_$$1;
  }
  const tmpReturnArg /*:array*/ /*truthy*/ = [`x`, b];
  return tmpReturnArg;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = f(undefined, true);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = f(`y`, false);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($dlr_$$1, tmpOutlinedParam) {
  let b = `bar`;
  if (!tmpOutlinedParam) {
    b = $dlr_$$1;
  }
  const tmpReturnArg = [`x`, b];
  return tmpReturnArg;
};
$(f(undefined, true));
$(f(`y`, false));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  let d = "bar";
  if (c) {

  }
  else {
    d = b;
  }
  const e = [ "x", d ];
  return e;
};
const f = a( undefined, true );
$( f );
const g = a( "y", false );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const tmpParamBare$1 = $dlr_$$0;
  let b = `bar`;
  const tmpIfTest$1 = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg = [`x`, b];
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(`y`);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['x', 'bar']
 - 2: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
