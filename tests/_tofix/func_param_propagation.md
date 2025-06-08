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
const f /*:(primitive)=>array*/ = function ($$0) {
  const tmpParamBare$1 /*:primitive*/ = $$0;
  debugger;
  let b /*:unknown*/ /*ternaryConst*/ = `bar`;
  const tmpIfTest$1 /*:boolean*/ = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg /*:array*/ /*truthy*/ = [`x`, b];
  return tmpReturnArg;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = f(`y`);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (tmpParamBare$1) {
  let b = `bar`;
  if (!(tmpParamBare$1 === undefined)) {
    b = tmpParamBare$1;
  }
  const tmpReturnArg = [`x`, b];
  return tmpReturnArg;
};
$(f());
$(f(`y`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  let c = "bar";
  const d = b === undefined;
  if (d) {

  }
  else {
    c = b;
  }
  const e = [ "x", c ];
  return e;
};
const f = a();
$( f );
const g = a( "y" );
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
