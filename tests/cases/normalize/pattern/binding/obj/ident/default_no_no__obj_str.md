# Preval test case

# default_no_no__obj_str.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = { x: 'abc' };
$(x);
`````

## Settled


`````js filename=intro
$(`abc`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
`````

## Pre Normal


`````js filename=intro
const { x: x } = { x: `abc` };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: `abc` };
const x = bindingPatternObjRoot.x;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
