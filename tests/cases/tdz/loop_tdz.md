# Preval test case

# loop_tdz.md

> Tdz > Loop tdz
>
> TDZ testing at the start of a loop is the same as TDZ testing before a loop

## Input

`````js filename=intro
if ($) {
  while ($LOOP_NO_UNROLLS_LEFT) {
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


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  tdz;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if ($) {
  tdz;
} else {
}
`````


## Todos triggered


None


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
