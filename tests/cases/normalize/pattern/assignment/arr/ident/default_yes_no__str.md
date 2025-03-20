# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Assignment > Arr > Ident > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([x = $('fail')] = 'abc');
$(x);
`````

## Settled


`````js filename=intro
x = `a`;
$(`a`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = `a`;
$(`a`);
`````

## Pre Normal


`````js filename=intro
[x = $(`fail`)] = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = `abc`;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
  $(x);
} else {
  x = arrPatternBeforeDefault;
  $(arrPatternBeforeDefault);
}
`````

## PST Settled
With rename=true

`````js filename=intro
x = "a";
$( "a" );
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
- inline computed array property read
