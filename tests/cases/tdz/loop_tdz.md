# Preval test case

# loop_tdz.md

> Tdz > Loop tdz
>
> TDZ testing at the start of a loop is the same as TDZ testing before a loop

## Input

`````js filename=intro
if ($) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    tdz
  }
} else {
}
`````

## Settled


`````js filename=intro
if ($) {
  tdz;
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  tdz;
}
`````

## Pre Normal


`````js filename=intro
if ($) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    tdz;
  }
} else {
}
`````

## Normalized


`````js filename=intro
if ($) {
  tdz;
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  tdz;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

tdz

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
