# Preval test case

# init_assign_left_member.md

> Normalize > Binding > Init assign left member
>
> Should normalize assignment init to separate line

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b = c.x
`````

## Settled


`````js filename=intro
(20).x;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
(20).x;
`````

## Pre Normal


`````js filename=intro
let b = 10;
let c = 20;
let a = (b = c.x);
`````

## Normalized


`````js filename=intro
let b = 10;
let c = 20;
b = c.x;
let a = b;
`````

## PST Settled
With rename=true

`````js filename=intro
20.x;
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
