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
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpArrPatternSplat /*:array*/ = [...tmpOPND];
y = $dotCall($array_slice, tmpArrPatternSplat, `slice`, 0);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $Number_prototype.x;
y = $dotCall($array_slice, [...tmpOPND], `slice`, 0);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
const b = [ ...a ];
y = $dotCall( $array_slice, b, "slice", 0 );
$( "bad" );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice


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
