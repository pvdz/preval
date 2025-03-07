# Preval test case

# default_no_no__obj_empty_str.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = { x: '' };
$(x);
`````

## Settled


`````js filename=intro
$(``);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````

## Pre Normal


`````js filename=intro
const { x: x } = { x: `` };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: `` };
const x = bindingPatternObjRoot.x;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
