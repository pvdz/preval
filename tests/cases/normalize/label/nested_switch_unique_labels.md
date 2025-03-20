# Preval test case

# nested_switch_unique_labels.md

> Normalize > Label > Nested switch unique labels
>
> Label generation was broken at some point and would generate identical label names, causing this to fail.

## Input

`````js filename=intro
switch ($) {
  case 3:
    switch ($) {
      case 3:
        break;
    }
}
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

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
