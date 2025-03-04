# Preval test case

# dotcall_arg_0.md

> Object literal > Inlining > Dotcall arg 0
>
>

## Input

`````js filename=intro
const g = function(){ $(); };
const obj = {f: g};
$dotCall(obj, window, undefined); // wot
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  $();
};
const obj = { f: g };
$dotCall(obj, window, undefined);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  $();
  return undefined;
};
const obj = { f: g };
$dotCall(obj, window, undefined);
`````

## Output


`````js filename=intro
const g /*:()=>unknown*/ = function () {
  debugger;
  $();
  return undefined;
};
const obj /*:object*/ = { f: g };
$dotCall(obj, window, undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $();
  return undefined;
};
const b = { f: a };
$dotCall( b, window, undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
