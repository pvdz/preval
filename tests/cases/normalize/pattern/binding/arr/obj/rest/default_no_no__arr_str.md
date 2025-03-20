# Preval test case

# default_no_no__arr_str.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default no no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x }] = ['abc', 20, 30];
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(`abc`, tmpCalleeParam$1, undefined);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(`abc`, [], undefined));
`````

## Pre Normal


`````js filename=intro
const [{ ...x }] = [`abc`, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [`abc`, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const x = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( "abc", a, undefined );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
