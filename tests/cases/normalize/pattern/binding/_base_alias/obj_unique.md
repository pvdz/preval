# Preval test case

# obj_unique.md

> Normalize > Pattern > Binding > Base alias > Obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
const { x: a } = 1
{ let a = 1; }
`````

## Settled


`````js filename=intro
(1).x;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).x;
`````

## Pre Normal


`````js filename=intro
{
  let a$1 = 1;
}
const { x: a } = 1;
{
  let a$3 = 1;
}
`````

## Normalized


`````js filename=intro
let a$1 = 1;
const bindingPatternObjRoot = 1;
const a = bindingPatternObjRoot.x;
let a$3 = 1;
`````

## PST Settled
With rename=true

`````js filename=intro
1.x;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
