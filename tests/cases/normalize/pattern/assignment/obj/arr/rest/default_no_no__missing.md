# Preval test case

# default_no_no__missing.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Default no no  missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [...y] } = { a: 11, b: 12 });
$('bad');
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = $Object_prototype.x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
y = arrPatternSplat.slice(0);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = $Object_prototype.x;
y = [...objPatternNoDefault].slice(0);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = [ ...a ];
y = b.slice( 0 );
$( "bad" );
`````


## Todos triggered


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
