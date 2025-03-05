# Preval test case

# id_dupe_after.md

> Normalize > Function > Expr > Id dupe after
>
> Function expression ids should be eliminated

## Input

`````js filename=intro
const f = function g() {
  $(typeof g);
};
const g = 10;
$(g, f());
`````

## Pre Normal


`````js filename=intro
const f = function g$1() {
  debugger;
  $(typeof g$1);
};
const g = 10;
$(g, f());
`````

## Normalized


`````js filename=intro
const g$1 = function () {
  debugger;
  const tmpCalleeParam = typeof g$1;
  $(tmpCalleeParam);
  return undefined;
};
const f = g$1;
const g = 10;
const tmpCalleeParam$1 = g;
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output


`````js filename=intro
$(`function`);
$(10, undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( "function" );
$( 10, undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - 2: 10, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
