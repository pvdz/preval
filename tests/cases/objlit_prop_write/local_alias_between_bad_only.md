# Preval test case

# local_alias_between_bad_only.md

> Objlit prop write > Local alias between bad only
>
>

## Options

- reducersOnly: objlitPropWrite

## Input

`````js filename=intro
const obj = {};
const before = $('ok');
const f = function(){};
const foo = before;
obj.x = foo;
$(obj);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = {};
const before /*:unknown*/ = $(`ok`);
const f /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const foo /*:unknown*/ = before;
obj.x = foo;
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = {};
const before = $(`ok`);
const f = function () {};
obj.x = before;
$(obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( "ok" );
const c = function() {
  debugger;
  return undefined;
};
const d = b;
a.x = d;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = {};
const before = $(`ok`);
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
