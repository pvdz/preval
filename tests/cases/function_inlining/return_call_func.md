# Preval test case

# return_call_func.md

> Function inlining > Return call func
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function g(a) {
  return $(a, 'g');
}
function f() {
  return g(10);
}
$(f(), 'outer');
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return g(10);
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
  const tmpReturnArg = g(10);
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
const tmpCalleeParam /*:unknown*/ = $(10, `g`);
$(tmpCalleeParam, `outer`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10, "g" );
$( a, "outer" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 'g'
 - 2: 10, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
