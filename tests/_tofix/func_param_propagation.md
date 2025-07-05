# Preval test case

# func_param_propagation.md

> Tofix > func param propagation
>
> New rule
> Primitives could be propagated through a func call and determine outside values
> From tests/cases/normalize/defaults/first_defaults_to_second.md
> The point here is that we could statically resolve this function call
> by propagating the param value in each call.
> We could also simplify the return value, regardless, to be an array
> where the first value is the string and the second value is the call
> result. But that may be risky in that it may blow up the code size.

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f('x')); // [x, bar]
$(f('x', 'y')); // [x, y]
`````


## Settled


`````js filename=intro
const f /*:(primitive, boolean)=>array*/ = function ($$0, $$1) {
  const tmpParamBare$1 /*:primitive*/ = $$0;
  const tmpOutlinedParam /*:boolean*/ = $$1;
  debugger;
  let b /*:primitive*/ /*ternaryConst*/ = `bar`;
  if (tmpOutlinedParam) {
  } else {
    b = tmpParamBare$1;
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
const f = function (tmpParamBare$1, tmpOutlinedParam) {
  let b = `bar`;
  if (!tmpOutlinedParam) {
    b = tmpParamBare$1;
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
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    throw `Preval: TDZ triggered for this read: ((tmpParamBare === undefined)? b : tmpParamBare)`;
  } else {
    a = tmpParamBare;
    let b = undefined;
    const tmpIfTest$1 = tmpParamBare$1 === undefined;
    if (tmpIfTest$1) {
      b = `bar`;
    } else {
      b = tmpParamBare$1;
    }
    const tmpReturnArg = [a, b];
    return tmpReturnArg;
  }
};
let tmpCalleeParam = f(`x`);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f(`x`, `y`);
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
