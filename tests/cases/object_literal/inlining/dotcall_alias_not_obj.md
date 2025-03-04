# Preval test case

# dotcall_alias_not_obj.md

> Object literal > Inlining > Dotcall alias not obj
>
>

## Input

`````js filename=intro
const g = function(){ return 'win'; };
const obj = {f: g};
const alias = $.f;
$();
$dotCall(alias, obj, 'f', 1);
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = $.f;
$();
$dotCall(alias, obj, `f`, 1);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = $.f;
$();
$dotCall(alias, obj, `f`, 1);
`````

## Output


`````js filename=intro
const g /*:()=>string*/ = function () {
  debugger;
  return `win`;
};
const alias /*:unknown*/ = $.f;
$();
const obj /*:object*/ = { f: g };
$dotCall(alias, obj, `f`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return "win";
};
const b = $.f;
$();
const c = { f: a };
$dotCall( b, c, "f", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
