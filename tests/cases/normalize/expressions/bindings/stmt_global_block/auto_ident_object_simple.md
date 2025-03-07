# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = { x: 1, y: 2, z: 3 };
  $(a);
}
`````

## Settled


`````js filename=intro
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 1, y: 2, z: 3 });
`````

## Pre Normal


`````js filename=intro
{
  let a = { x: 1, y: 2, z: 3 };
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = { x: 1, y: 2, z: 3 };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
