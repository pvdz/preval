# Preval test case

# default_no_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } } = { x: 0, b: 11, c: 12 };
$(y);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const y /*:unknown*/ = objPatternRest(0, tmpCalleeParam$1, undefined);
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(objPatternRest(0, [], undefined));
`````

## Pre Normal


`````js filename=intro
const {
  x: { ...y },
} = { x: 0, b: 11, c: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const y = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = objPatternRest( 0, a, undefined );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
