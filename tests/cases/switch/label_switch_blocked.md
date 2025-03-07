# Preval test case

# label_switch_blocked.md

> Switch > Label switch blocked
>
> This did not triggered the edge case in the pre transform

## Input

`````js filename=intro
e: { switch (x) {} }
`````

## Settled


`````js filename=intro
x;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
`````

## Pre Normal


`````js filename=intro
e: {
  tmpSwitchBreak: {
    const tmpSwitchDisc = x;
    {
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpSwitchDisc = x;
`````

## PST Settled
With rename=true

`````js filename=intro
x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
