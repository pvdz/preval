# Preval test case

# default_no_no_no__empty_str.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default no no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x }] = '');
$('bad');
`````

## Settled


`````js filename=intro
x = undefined.x;
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = undefined.x;
$(`bad`);
`````

## Pre Normal


`````js filename=intro
[{ x: x }] = ``;
$(`bad`);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = ``;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
x = undefined.x;
$( "bad" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
