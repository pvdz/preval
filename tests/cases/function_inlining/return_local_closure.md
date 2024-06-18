# Preval test case

# return_local_closure.md

> Function inlining > Return local closure
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function g() {
  let y = $(10);
  function f() {
    return y;
  }
  return f();
}
$(g());
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return y;
  };
  let y = $(10);
  return f();
};
$(g());
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return y;
  };
  let y = $(10);
  const tmpReturnArg = f();
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = g();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const y = $(10);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
