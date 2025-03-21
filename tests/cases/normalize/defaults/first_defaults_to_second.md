# Preval test case

# first_defaults_to_second.md

> Normalize > Defaults > First defaults to second
>
> Rewrite function param defaults to equivalent body code
> In this case a=b triggers a TDZ error if the passed on value for a is `undefined`
> because in this case the params are let bindings and so TDZ triggers.

TDZ case

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f()); // runtime error
$(f('x')); // [x, bar]
$(f(undefined, 'y')); // runtime error
$(f('x', 'y')); // [x, y]
`````


## Settled


`````js filename=intro
const f /*:(primitive, primitive)=>array*/ = function ($$0, $$1) {
  const tmpParamBare$1 /*:primitive*/ = $$0;
  const tmpParamBare$3 /*:primitive*/ = $$1;
  debugger;
  const tmpIfTest /*:boolean*/ = tmpParamBare$1 === undefined;
  if (tmpIfTest) {
    throw `Preval: TDZ triggered for this read: ((tmpParamBare === undefined)? b : tmpParamBare)`;
  } else {
    let b /*:unknown*/ = `bar`;
    const tmpIfTest$1 /*:boolean*/ = tmpParamBare$3 === undefined;
    if (tmpIfTest$1) {
    } else {
      b = tmpParamBare$3;
    }
    const tmpReturnArg /*:array*/ = [tmpParamBare$1, b];
    return tmpReturnArg;
  }
};
const tmpCalleeParam /*:array*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ = f(`x`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:array*/ = f(undefined, `y`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:array*/ = f(`x`, `y`);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (tmpParamBare$1, tmpParamBare$3) {
  if (tmpParamBare$1 === undefined) {
    throw `Preval: TDZ triggered for this read: ((tmpParamBare === undefined)? b : tmpParamBare)`;
  } else {
    let b = `bar`;
    if (!(tmpParamBare$3 === undefined)) {
      b = tmpParamBare$3;
    }
    const tmpReturnArg = [tmpParamBare$1, b];
    return tmpReturnArg;
  }
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
  const d = b === undefined;
  if (d) {
    throw "Preval: TDZ triggered for this read: ((tmpParamBare === undefined)? b : tmpParamBare)";
  }
  else {
    let e = "bar";
    const f = c === undefined;
    if (f) {

    }
    else {
      e = c;
    }
    const g = [ b, e ];
    return g;
  }
};
const h = a();
$( h );
const i = a( "x" );
$( i );
const j = a( undefined, "y" );
$( j );
const k = a( "x", "y" );
$( k );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
