# Preval test case

# default_yes_yes_no__empty_str.md

> Normalize > Pattern > Assignment > Arr > Arr > Ident > Default yes yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[x = $('fail')] = $(['pass2'])] = '');
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass2`];
const arrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat$1 /*:array*/ = [...arrPatternStep];
const arrPatternBeforeDefault$1 /*:unknown*/ = arrPatternSplat$1[0];
const tmpIfTest$1 /*:boolean*/ = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
  $(x);
} else {
  x = arrPatternBeforeDefault$1;
  $(arrPatternBeforeDefault$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arrPatternStep = $([`pass2`]);
const arrPatternBeforeDefault$1 = [...arrPatternStep][0];
if (arrPatternBeforeDefault$1 === undefined) {
  x = $(`fail`);
  $(x);
} else {
  x = arrPatternBeforeDefault$1;
  $(arrPatternBeforeDefault$1);
}
`````

## Pre Normal


`````js filename=intro
[[x = $(`fail`)] = $([`pass2`])] = ``;
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = ``;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`pass2`];
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
  $(x);
} else {
  x = arrPatternBeforeDefault$1;
  $(arrPatternBeforeDefault$1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
const e = d === undefined;
if (e) {
  x = $( "fail" );
  $( x );
}
else {
  x = d;
  $( d );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - 1: ['pass2']
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
