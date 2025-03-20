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


## Settled


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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $();
};
$dotCall(/foo/, { f: g }, undefined);
`````


## PST Settled
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


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
