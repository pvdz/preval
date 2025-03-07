# Preval test case

# test_complex.md

> Normalize > Switch > Test complex
>
> Normalize switches

## Input

`````js filename=intro
switch ($(1)) {

}
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  {
  }
}
`````

## Normalized


`````js filename=intro
const tmpSwitchDisc = $(1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
