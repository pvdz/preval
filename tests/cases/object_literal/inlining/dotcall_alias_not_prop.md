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
$dotCall(alias, obj, 'g');
`````

## Settled


`````js filename=intro
const g /*:()=>unknown*/ = function () {
  debugger;
  return `win`;
};
const obj /*:object*/ = { f: g };
obj.g();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  return `win`;
};
({ f: g }.g());
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = obj.g;
$dotCall(alias, obj, `g`);
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

## PST Settled
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

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Post settled calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Denormalized calls: BAD!!
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
