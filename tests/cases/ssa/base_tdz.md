# Preval test case

# base_tdz.md

> Ssa > Base tdz
>
> Contrived example

This is a tdz example we can detect safely

## Input

`````js filename=intro
$(x);
let x = $(5);
$(x);
// Next write can be SSA'd
x = $(10);
$(x);
`````

## Settled


`````js filename=intro
throw `Preval: TDZ triggered for this read: \$(x)`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: \$(x)`;
`````

## Pre Normal


`````js filename=intro
$($throwTDZError(`Preval: TDZ triggered for this read: \$(x)`));
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Normalized


`````js filename=intro
throw `Preval: TDZ triggered for this read: \$(x)`;
let x = 0;
`````

## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: $(x)";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
