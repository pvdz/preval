# Preval test case

# serialization_props_multi_use_bad.md

> Object literal > Serialization props multi use bad
>
> tostring

## Input

`````js filename=intro
const a = {x: 1, y: "twee"};
const b = $coerce(a, `plustr`);
a.toString = $spy('oopsie');
$(b);
const c = $coerce(a, `plustr`);
$(c);
`````


## Settled


`````js filename=intro
const tmpAssignMemRhs /*:unknown*/ = $spy(`oopsie`);
$(`[object Object]`);
const a /*:object*/ /*truthy*/ = { x: 1, y: `twee`, toString: tmpAssignMemRhs };
const c /*:string*/ = $coerce(a, `plustr`);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignMemRhs = $spy(`oopsie`);
$(`[object Object]`);
$({ x: 1, y: `twee`, toString: tmpAssignMemRhs } + ``);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "oopsie" );
$( "[object Object]" );
const b = {
  x: 1,
  y: "twee",
  toString: a,
};
const c = $coerce( b, "plustr" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = { x: 1, y: `twee` };
const b = $coerce(a, `plustr`);
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $spy(`oopsie`);
tmpAssignMemLhsObj.toString = tmpAssignMemRhs;
$(b);
const c = $coerce(a, `plustr`);
$(c);
`````


## Todos triggered


- (todo) object concat blocked by invalidated reads
- (todo) object concat blocked by invalidated writes


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['oopsie', 'oopsie']
 - 2: '[object Object]'
 - eval returned: ('<crash[ Cannot convert object to primitive value ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
