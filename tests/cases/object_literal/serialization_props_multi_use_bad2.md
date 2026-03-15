# Preval test case

# serialization_props_multi_use_bad2.md

> Object literal > Serialization props multi use bad2
>
> tostring

## Input

`````js filename=intro
const a = {x: 1, y: "twee"};
const b = $coerce(a, `plustr`);
a.valueOf = $spy('oopsie');
$(b);
const c = $coerce(a, `plustr`);
$(c);
`````


## Settled


`````js filename=intro
const tmpAssignMemRhs /*:unknown*/ = $spy(`oopsie`);
$(`[object Object]`);
const a /*:object*/ /*truthy*/ = { x: 1, y: `twee`, valueOf: tmpAssignMemRhs };
const c /*:string*/ = $coerce(a, `plustr`);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignMemRhs = $spy(`oopsie`);
$(`[object Object]`);
$({ x: 1, y: `twee`, valueOf: tmpAssignMemRhs } + ``);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "oopsie" );
$( "[object Object]" );
const b = {
  x: 1,
  y: "twee",
  valueOf: a,
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
tmpAssignMemLhsObj.valueOf = tmpAssignMemRhs;
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
 - 3: '[object Object]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
