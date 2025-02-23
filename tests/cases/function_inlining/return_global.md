# Preval test case

# return_global.md

> Function inlining > Return global
>
> We should be able to inline certain functions

## Input

`````js filename=intro
let y = $(10);
function f() {
  return y;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return y;
};
let y = $(10);
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return y;
};
let y = $(10);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const y /*:unknown*/ = $(10);
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
