# Preval test case

# dotcall_unknown_alias_obj.md

> Object literal > Inlining > Dotcall unknown alias obj
>
>

## Input

`````js filename=intro
const g = function(){ $(); };
const obj = {f: g};
const method = /foo/; // Nevermind that it's not callable
$dotCall(method, obj, undefined);
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  $();
};
const obj = { f: g };
const method = /foo/;
$dotCall(method, obj, undefined);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  $();
  return undefined;
};
const obj = { f: g };
const method = /foo/;
$dotCall(method, obj, undefined);
`````

## Output


`````js filename=intro
const g /*:()=>unknown*/ = function () {
  debugger;
  $();
  return undefined;
};
const method /*:regex*/ = /foo/;
const obj /*:object*/ = { f: g };
$dotCall(method, obj, undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $();
  return undefined;
};
const b = /foo/;
const c = { f: a };
$dotCall( b, c, undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
