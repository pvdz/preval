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
const method /*:regex*/ = new $regex_constructor(`foo`, ``);
const obj /*:object*/ = { f: g };
$dotCall(method, obj, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $();
};
$dotCall(new $regex_constructor(`foo`, ``), { f: g }, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $();
  return undefined;
};
const b = new $regex_constructor( "foo", "" );
const c = { f: a };
$dotCall( b, c, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const g = function () {
  debugger;
  $();
  return undefined;
};
const obj = { f: g };
const method = new $regex_constructor(`foo`, ``);
$dotCall(method, obj, undefined);
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
