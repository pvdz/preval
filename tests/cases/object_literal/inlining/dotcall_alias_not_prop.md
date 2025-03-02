# Preval test case

# dotcall_alias_not_prop.md

> Object literal > Inlining > Dotcall alias not prop
>
>

## Input

`````js filename=intro
const g = function(){ return 'win'; };
const obj = {f: g};
const alias = obj.g;
$dotCall(alias, obj);
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = obj.g;
$dotCall(alias, obj);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
obj.g();
`````

## Output


`````js filename=intro
const g /*:()=>unknown*/ = function () {
  debugger;
  return `win`;
};
const obj /*:object*/ = { f: g };
obj.g();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return "win";
};
const b = { f: a };
b.g();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
