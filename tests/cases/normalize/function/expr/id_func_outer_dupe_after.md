# Preval test case

# id_func_outer_dupe_after.md

> Normalize > Function > Expr > Id func outer dupe after
>
> Function expression ids should be eliminated

## Input

`````js filename=intro
function out() {
  const f = function g() {
    $(typeof g);
  };
  $(g, f());
}
const g = 10;
out();
out();
$(typeof g);
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
$(typeof g);
`````

## Normalized


`````js filename=intro
let out = function () {
  debugger;
  const g$1 = function () {
    debugger;
    const tmpCalleeParam = typeof g$1;
    $(tmpCalleeParam);
    return undefined;
  };
  const f = g$1;
  const tmpCalleeParam$1 = g;
  const tmpCalleeParam$3 = f();
  $(tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
const g = 10;
out();
out();
const tmpCalleeParam$5 = typeof g;
$(tmpCalleeParam$5);
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
$(`number`);
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
$( "number" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - 2: 10, undefined
 - 3: 'function'
 - 4: 10, undefined
 - 5: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
