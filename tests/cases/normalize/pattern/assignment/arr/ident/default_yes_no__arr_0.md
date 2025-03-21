# Preval test case

# default_yes_no__arr_0.md

> Normalize > Pattern > Assignment > Arr > Ident > Default yes no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([x = $('pass')] = [0, 201]);
$(x);
`````

## Settled


`````js filename=intro
x = 0;
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 0;
$(0);
`````

## Pre Normal


`````js filename=intro
[x = $(`pass`)] = [0, 201];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [0, 201];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(x);
} else {
  x = arrPatternBeforeDefault;
  $(arrPatternBeforeDefault);
}
`````

## PST Settled
With rename=true

`````js filename=intro
x = 0;
$( 0 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
