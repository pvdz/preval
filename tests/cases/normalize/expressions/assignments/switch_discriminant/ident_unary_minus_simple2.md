# Preval test case

# ident_unary_minus_simple2.md

> Normalize > Expressions > Assignments > Switch discriminant > Ident unary minus simple2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = 1;
let b = 2;
{
  const ignored = b = -a;
}
$(b, a);
`````

## Settled


`````js filename=intro
$(-1, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1, 1);
`````

## Pre Normal


`````js filename=intro
let a = 1;
let b = 2;
{
  const ignored = (b = -a);
}
$(b, a);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
b = -a;
let ignored = b;
$(b, a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -1, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
