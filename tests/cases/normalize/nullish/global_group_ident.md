# Preval test case

# global_group_ident.md

> Normalize > Nullish > Global group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
const a = {x: 1}
const y = (1, a)??x
$(y);
`````

## Settled


`````js filename=intro
const a /*:object*/ = { x: 1 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 1 });
`````

## Pre Normal


`````js filename=intro
const a = { x: 1 };
const y = (1, a) ?? x;
$(y);
`````

## Normalized


`````js filename=intro
const a = { x: 1 };
let y = a;
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = x;
  $(x);
} else {
  $(y);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
