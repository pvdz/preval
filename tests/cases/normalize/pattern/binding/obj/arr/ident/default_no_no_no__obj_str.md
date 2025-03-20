# Preval test case

# default_no_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y] } = { x: 'abc', a: 11, b: 12 };
$(y);
`````

## Settled


`````js filename=intro
$(`a`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
`````

## Pre Normal


`````js filename=intro
const {
  x: [y],
} = { x: `abc`, a: 11, b: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: `abc`, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "a" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
