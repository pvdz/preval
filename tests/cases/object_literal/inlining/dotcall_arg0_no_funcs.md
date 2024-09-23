# Preval test case

# dotcall_arg0_no_funcs.md

> Object literal > Inlining > Dotcall arg0 no funcs
>
>

## Input

`````js filename=intro
const g = function(){ $(); };
const h = function(){ $(); };
const obj = {f: 123};
$dotCall(h, obj); // obj has no funcs heh
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
const obj = { f: 123 };
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
const obj = { f: 123 };
$dotCall(h, obj);
`````

## Output


`````js filename=intro
const h /*:()=>*/ = function () {
  debugger;
  $();
  return undefined;
};
const obj /*:object*/ = { f: 123 };
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
const b = { f: 123 };
$dotCall( a, b );
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
