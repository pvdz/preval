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

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $;
  if (tmpSwitchDisc === 3) {
    tmpSwitchBreak$1: {
      const tmpSwitchDisc$1 = $;
      if (tmpSwitchDisc$1 === 3) {
        break tmpSwitchBreak$1;
      } else {
      }
    }
  } else {
  }
}
`````

## Normalized


`````js filename=intro
const tmpSwitchDisc = $;
const tmpIfTest = tmpSwitchDisc === 3;
if (tmpIfTest) {
  tmpSwitchBreak$1: {
    const tmpSwitchDisc$1 = $;
    const tmpIfTest$1 = tmpSwitchDisc$1 === 3;
    if (tmpIfTest$1) {
      break tmpSwitchBreak$1;
    } else {
    }
  }
} else {
}
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
