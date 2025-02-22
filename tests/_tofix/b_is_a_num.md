# Preval test case

# b_is_an_arree.md

> Tests > Tofix > B is an arree

(this is a test)

The b param is going to be an number regardless. Typing should know.

## Input

`````js filename=intro
let f = function () {
  let g = function (a, ...b) {
    x = typeof b;
  };
  const arr = $([1, 2]);
  g(10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = typeof b;
  };
  const arr = $([1, 2]);
  g(10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = typeof b;
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arr = tmpCallCallee(tmpCalleeParam);
  g(10, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````

## Output


`````js filename=intro
let x /*:primitive*/ = 0;
const g /*:(unknown)=>undefined*/ = function (...$$0) {
  const b = $$0;
  debugger;
  x = typeof b;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2];
$(tmpCalleeParam);
g(20, 30, 40, 50, 60);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
const b = function($$0 ) {
  const c = $$0;
  debugger;
  a = typeof c;
  return undefined;
};
const d = [ 1, 2 ];
$( d );
b( 20, 30, 40, 50, 60 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
