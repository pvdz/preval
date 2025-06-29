# Preval test case

# local_alias_between_only.md

> Objlit prop write > Local alias between only
>
>

## Options

- reducersOnly: objlitPropWrite

## Input

`````js filename=intro
const before = $('ok');
const obj = {};
const f = function(){};
const foo = before;
obj.x = foo;
$(obj);
`````


## Settled


`````js filename=intro
const before /*:unknown*/ = $(`ok`);
const obj /*:object*/ /*truthy*/ = { x: before };
const f /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const foo /*:unknown*/ = before;
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const before = $(`ok`);
const obj = { x: before };
const f = function () {};
const foo = before;
$(obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "ok" );
const b = { x: a };
const c = function() {
  debugger;
  return undefined;
};
const d = a;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const before = $(`ok`);
const obj = {};
const f = function () {
  debugger;
  return undefined;
};
const foo = before;
obj.x = foo;
$(obj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - 2: { x: '"ok"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
