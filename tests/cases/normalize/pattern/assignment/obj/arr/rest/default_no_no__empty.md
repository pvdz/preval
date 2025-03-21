# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [...y] } = 1);
$('bad');
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
y = arrPatternSplat.slice(0);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = (1).x;
y = [...objPatternNoDefault].slice(0);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = [ ...a ];
y = b.slice( 0 );
$( "bad" );
`````


## Todos triggered


- replace with $array_slice
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
