# Preval test case

# multiple_let_no_init.md

> Normalize > Var > Multiple let no init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

## Input

`````js filename=intro
let a, b, c

$(a);
$(b);
$(c);
`````

## Settled


`````js filename=intro
$(undefined);
$(undefined);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let a, b, c;
$(a);
$(b);
$(c);
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
$(a);
$(b);
$(c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
