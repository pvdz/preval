# Preval test case

# dotcall_restore.md

> Tests > Tofix > Dotcall restore
>
> I think in this case we should still be able to eliminate the dotcall in favor of the actual call

## Input

`````js filename=intro
const f = function(Cu$3) {
  const tmpCallCompVal$27 = Cu$3.replace;
  const tmpCalleeParam$81 = /[^0-9]/g;
  const tmpReturnArg$29 = $dotCall(tmpCallCompVal$27, Cu$3, tmpCalleeParam$81, ``);
  return tmpReturnArg$29;
};
$(f);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let Cu$3 = $$0;
  debugger;
  const tmpCallCompVal$27 = Cu$3.replace;
  const tmpCalleeParam$81 = /[^0-9]/g;
  const tmpReturnArg$29 = $dotCall(tmpCallCompVal$27, Cu$3, tmpCalleeParam$81, ``);
  return tmpReturnArg$29;
};
$(f);
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let Cu$3 = $$0;
  debugger;
  const tmpCallCompVal$27 = Cu$3.replace;
  const tmpCalleeParam$81 = /[^0-9]/g;
  const tmpReturnArg$29 = $dotCall(tmpCallCompVal$27, Cu$3, tmpCalleeParam$81, ``);
  return tmpReturnArg$29;
};
$(f);
`````

## Output


`````js filename=intro
const f /*:(unknown)=>?*/ = function ($$0) {
  const Cu$3 = $$0;
  debugger;
  const tmpCalleeParam$81 /*:regex*/ = /[^0-9]/g;
  const tmpReturnArg$29 = Cu$3.replace(tmpCalleeParam$81, ``);
  return tmpReturnArg$29;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = /[^0-9]/g;
  const d = b.replace( c, "" );
  return d;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
