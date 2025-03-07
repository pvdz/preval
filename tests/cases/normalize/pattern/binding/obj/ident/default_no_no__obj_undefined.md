# Preval test case

# default_no_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = { x: undefined };
$(x);
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
const { x: x } = { x: undefined };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: undefined };
const x = bindingPatternObjRoot.x;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
