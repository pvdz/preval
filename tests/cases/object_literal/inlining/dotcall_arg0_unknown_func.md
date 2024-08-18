# Preval test case

# dotcall_arg0_unknown_func.md

> Object literal > Inlining > Dotcall arg0 unknown func
>
>

## Input

`````js filename=intro
const g = function(){ $(); };
const h = function(){ $(); };
const obj = {f: g};
$dotCall(h, obj); // not calling an obj prop value
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  $();
};
const h = function () {
  debugger;
  $();
};
const obj = { f: g };
$dotCall(h, obj);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  $();
  return undefined;
};
const h = function () {
  debugger;
  $();
  return undefined;
};
const obj = { f: g };
$dotCall(h, obj);
`````

## Output


`````js filename=intro
const g = function () {
  debugger;
  $();
  return undefined;
};
const h = function () {
  debugger;
  $();
  return undefined;
};
const obj = { f: g };
$dotCall(h, obj);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $();
  return undefined;
};
const b = function() {
  debugger;
  $();
  return undefined;
};
const c = { f: a };
$dotCall( b, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
