# Preval test case

# default_no__undefined.md

> Normalize > Pattern > Binding > Arr > Rest > Default no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [...x] = undefined;
$('bad');
`````

## Settled


`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
const [...x] = undefined;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = undefined;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...undefined ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
