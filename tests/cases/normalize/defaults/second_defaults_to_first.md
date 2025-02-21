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

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = tmpParamBare === undefined ? `foo` : tmpParamBare;
  let b = tmpParamBare$1 === undefined ? a : tmpParamBare$1;
  return [a, b];
};
$(f());
$(f(`x`));
$(f(undefined, `y`));
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
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(`x`);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(undefined, `y`);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f(`x`, `y`);
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const f /*:(primitive, primitive)=>array*/ = function ($$0, $$1) {
  const tmpParamBare /*:primitive*/ = $$0;
  const tmpParamBare$1 /*:primitive*/ = $$1;
  debugger;
  let a = `foo`;
  const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
  if (tmpIfTest) {
  } else {
    a = tmpParamBare;
  }
  let b = undefined;
  const tmpIfTest$1 /*:boolean*/ = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
    b = a;
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg /*:array*/ = [a, b];
  return tmpReturnArg;
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

## PST Output

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
  let f = undefined;
  const g = c === undefined;
  if (g) {
    f = d;
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

## Globals

None

## Result

Should call `$` with:
 - 1: ['foo', 'foo']
 - 2: ['x', 'x']
 - 3: ['foo', 'y']
 - 4: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
