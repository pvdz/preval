# Preval test case

# two.md

> Normalize > Defaults > Two
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = "bar") { 
  return [a, b]; 
}

$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````


## Settled


`````js filename=intro
const f /*:(primitive, primitive)=>array*/ = function ($$0, $$1) {
  const tmpParamBare /*:primitive*/ = $$0;
  const tmpParamBare$1 /*:primitive*/ = $$1;
  debugger;
  let a /*:unknown*/ /*ternaryConst*/ = `foo`;
  const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
  if (tmpIfTest) {
  } else {
    a = tmpParamBare;
  }
  let b /*:unknown*/ /*ternaryConst*/ = `bar`;
  const tmpIfTest$1 /*:boolean*/ = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg /*:array*/ /*truthy*/ = [a, b];
  return tmpReturnArg;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = f(`x`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = f(undefined, `y`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = f(`x`, `y`);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (tmpParamBare, tmpParamBare$1) {
  let a = `foo`;
  if (!(tmpParamBare === undefined)) {
    a = tmpParamBare;
  }
  let b = `bar`;
  if (!(tmpParamBare$1 === undefined)) {
    b = tmpParamBare$1;
  }
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
};
$(f());
$(f(`x`));
$(f(undefined, `y`));
$(f(`x`, `y`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  let d = "foo";
  const e = b === undefined;
  if (e) {

  }
  else {
    d = b;
  }
  let f = "bar";
  const g = c === undefined;
  if (g) {

  }
  else {
    f = c;
  }
  const h = [ d, f ];
  return h;
};
const i = a();
$( i );
const j = a( "x" );
$( j );
const k = a( undefined, "y" );
$( k );
const l = a( "x", "y" );
$( l );
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
    a = `foo`;
  } else {
    a = tmpParamBare;
  }
  let b = undefined;
  const tmpIfTest$1 = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
    b = `bar`;
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
let tmpCalleeParam$1 = f(`x`);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f(undefined, `y`);
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = f(`x`, `y`);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['foo', 'bar']
 - 2: ['x', 'bar']
 - 3: ['foo', 'y']
 - 4: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
