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
const g /*:()=>string*/ = function $pcompiled() {
  debugger;
  return `win`;
};
const alias /*:unknown*/ = $Object_prototype.g;
const obj /*:object*/ /*truthy*/ = { f: g };
$dotCall(alias, obj, `g`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function $pcompiled() {
  return `win`;
};
$dotCall($Object_prototype.g, { f: g }, `g`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return "win";
};
const b = $Object_prototype.g;
const c = { f: a };
$dotCall( b, c, "g" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = obj.g;
$dotCall(alias, obj, `g`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
