# Preval test case

# id_func_outer_dupe_before.md

> Normalize > Function > Expr > Id func outer dupe before
>
> Function expression ids should be eliminated

## Input

`````js filename=intro
const g = 10;
function out() {
  const f = function g() {
    $(typeof g);
  };
  $(g, f());
}
out();
out();
`````

## Pre Normal


`````js filename=intro
let out = function () {
  debugger;
  const f = function g$1() {
    debugger;
    $(typeof g$1);
  };
  $(g, f());
};
const g = 10;
out();
out();
`````

## Normalized


`````js filename=intro
let out = function () {
  debugger;
  const g$1 = function () {
    debugger;
    const tmpCallCallee = $;
    const tmpCalleeParam = typeof g$1;
    tmpCallCallee(tmpCalleeParam);
    return undefined;
  };
  const f = g$1;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = g;
  const tmpCalleeParam$3 = f();
  tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
const g = 10;
out();
out();
`````

## Output


`````js filename=intro
const out /*:()=>unknown*/ = function () {
  debugger;
  $(`function`);
  $(10, undefined);
  return undefined;
};
out();
out();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "function" );
  $( 10, undefined );
  return undefined;
};
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - 2: 10, undefined
 - 3: 'function'
 - 4: 10, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
