# Preval test case

# multiple_let_init.md

> Normalize > Var > Multiple let init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

## Input

`````js filename=intro
let a = $(1), b = $(2), c = $(3);
`````

## Settled


`````js filename=intro
$(1);
$(2);
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(3);
`````

## Pre Normal


`````js filename=intro
let a = $(1),
  b = $(2),
  c = $(3);
`````

## Normalized


`````js filename=intro
let a = $(1);
let b = $(2);
let c = $(3);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
