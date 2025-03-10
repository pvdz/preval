# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Binding > Obj > Rest > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { ...x } = 0;
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(0, tmpCalleeParam$1, `x`);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(0, [], `x`));
`````

## Pre Normal


`````js filename=intro
const { ...x } = 0;
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 0;
const tmpCalleeParam = bindingPatternObjRoot;
const tmpCalleeParam$1 = [];
const x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, `x`);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( 0, a, "x" );
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
