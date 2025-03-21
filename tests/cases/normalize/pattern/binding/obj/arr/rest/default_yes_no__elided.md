# Preval test case

# default_yes_no__elided.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default yes no  elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [...y] = $(['fail']) } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````

## Settled


`````js filename=intro
const y /*:array*/ = [undefined, undefined, undefined, 1];
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([undefined, undefined, undefined, 1]);
`````

## Pre Normal


`````js filename=intro
const { x: [...y] = $([`fail`]) } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = [, , , 1];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`fail`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined, undefined, undefined, 1 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
