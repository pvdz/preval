# Preval test case

# var_body.md

> Ifelse > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
if ($(true)) var x = 0;
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($(true)) x = 0;
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 0;
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
