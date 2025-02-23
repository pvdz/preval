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

## Pre Normal


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

## Normalized


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

## Output


`````js filename=intro
const f /*:(primitive)=>array*/ = function ($$0) {
  const $dlr_$$0 /*:primitive*/ = $$0;
  debugger;
  let b = `bar`;
  const tmpIfTest$1 /*:boolean*/ = $dlr_$$0 === undefined;
  if (tmpIfTest$1) {
  } else {
    b = $dlr_$$0;
  }
  const tmpReturnArg /*:array*/ = [`x`, b];
  return tmpReturnArg;
};
const tmpCalleeParam /*:array*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ = f(`y`);
$(tmpCalleeParam$1);
`````

## PST Output

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
