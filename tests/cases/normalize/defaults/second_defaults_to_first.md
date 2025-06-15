# Preval test case

# second_defaults_to_first.md

> Normalize > Defaults > Second defaults to first
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = a) { 
  return [a, b]; 
}

$(f()); // [foo, foo]
$(f('x')); // [x, x]
$(f(undefined, 'y')); // [foo, y]
$(f('x', 'y')); // [x, y]
`````


## Settled


`````js filename=intro
const f /*:(primitive, primitive, boolean)=>array*/ = function ($$0, $$1, $$2) {
  const tmpParamBare /*:primitive*/ = $$0;
  const tmpParamBare$1 /*:primitive*/ = $$1;
  const tmpOutlinedParam /*:boolean*/ = $$2;
  debugger;
  let a /*:unknown*/ /*ternaryConst*/ = `foo`;
  if (tmpOutlinedParam) {
  } else {
    a = tmpParamBare;
  }
  let b /*:unknown*/ /*ternaryConst*/ = undefined;
  const tmpIfTest$1 /*:boolean*/ = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
    b = a;
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg /*:array*/ /*truthy*/ = [a, b];
  return tmpReturnArg;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = f(undefined, undefined, true);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = f(`x`, undefined, false);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = f(undefined, `y`, true);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = f(`x`, `y`, false);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (tmpParamBare, tmpParamBare$1, tmpOutlinedParam) {
  let a = `foo`;
  if (!tmpOutlinedParam) {
    a = tmpParamBare;
  }
  let b = undefined;
  if (tmpParamBare$1 === undefined) {
    b = a;
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
};
$(f(undefined, undefined, true));
$(f(`x`, undefined, false));
$(f(undefined, `y`, true));
$(f(`x`, `y`, false));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  let e = "foo";
  if (d) {

  }
  else {
    e = b;
  }
  let f = undefined;
  const g = c === undefined;
  if (g) {
    f = e;
  }
  else {
    f = c;
  }
  const h = [ e, f ];
  return h;
};
const i = a( undefined, undefined, true );
$( i );
const j = a( "x", undefined, false );
$( j );
const k = a( undefined, "y", true );
$( k );
const l = a( "x", "y", false );
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
    b = a;
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
 - 1: ['foo', 'foo']
 - 2: ['x', 'x']
 - 3: ['foo', 'y']
 - 4: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
