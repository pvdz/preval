# Preval test case

# return_new_func.md

> Function inlining > Return new func
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function g(a) {
  return $(a, 'g');
}
function f() {
  return new g(10);
}
$(f(), 'outer');
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return new g(10);
};
let g = function ($$0) {
  let a = $$0;
  debugger;
  return $(a, `g`);
};
$(f(), `outer`);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = new g(10);
  return tmpReturnArg;
};
let g = function ($$0) {
  let a = $$0;
  debugger;
  const tmpReturnArg$1 = $(a, `g`);
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = `outer`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const g /*:(unknown)=>?*/ = function ($$0) {
  const a = $$0;
  debugger;
  const tmpReturnArg$1 = $(a, `g`);
  return tmpReturnArg$1;
};
const tmpReturnArg /*:object*/ = new g(10);
$(tmpReturnArg, `outer`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = $( b, "g" );
  return d;
};
const e = new a( 10 );
$( e, "outer" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 'g'
 - 2: {}, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
