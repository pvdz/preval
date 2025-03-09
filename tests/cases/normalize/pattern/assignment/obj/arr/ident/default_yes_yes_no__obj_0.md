# Preval test case

# default_yes_yes_no__obj_0.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes yes no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['fail2']) } = { x: 0, a: 11, b: 12 });
$('bad');
`````

## Settled


`````js filename=intro
[...0];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...0];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
({ x: [y = `fail`] = $([`fail2`]) } = { x: 0, a: 11, b: 12 });
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0, a: 11, b: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`fail2`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = `fail`;
  $(`bad`);
} else {
  y = arrPatternBeforeDefault;
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...0 ];
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
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope