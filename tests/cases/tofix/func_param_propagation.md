# Preval test case

# func_param_propagation.md

> Tofix > Func param propagation
>
> New rule
> Primitives could be propagated through a func call and determine outside values
> From tests/cases/normalize/defaults/first_defaults_to_second.md
> The point here is that we could statically resolve this function call
> by propagating the param value in each call.
> We could also simplify the return value, regardless, to be an array
> where the first value is the string and the second value is the call
> result. But that may be risky in that it may blow up the code size.

#TODO

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f('x')); // [x, bar]
$(f('x', 'y')); // [x, y]
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = tmpParamBare === undefined ? b : tmpParamBare;
  let b = tmpParamBare$1 === undefined ? `bar` : tmpParamBare$1;
  return [a, b];
};
$(f(`x`));
$(f(`x`, `y`));
`````

## Normalized

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
const tmpCallCallee = $;
const tmpCalleeParam = f(`x`);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(`x`, `y`);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

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

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  let d = "bar";
  const e = b === undefined;
  if (e) {

  }
  else {
    d = b;
  }
  const f = [ "x", d ];
  return f;
};
const g = a();
$( g );
const h = a( "y" );
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['x', 'bar']
 - 2: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
