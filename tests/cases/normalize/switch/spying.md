# Preval test case

# spying.md

> Normalize > Switch > Spying
>
> Do cases spy

## Input

`````js filename=intro
switch ($(1)) {
  case $spy(0):
    $('false');
    break;
  case $spy(1):
    $('true');
    break;
  case $spy(2):
    $('false');
    break;
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $spy(0)) {
    $(`false`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === $spy(1)) {
    $(`true`);
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === $spy(2)) {
    $(`false`);
    break tmpSwitchBreak;
  } else {
  }
}
`````

## Normalized


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $spy(0);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(`false`);
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = $spy(1);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(`true`);
      break tmpSwitchBreak;
    } else {
      const tmpBinBothLhs$3 = tmpSwitchDisc;
      const tmpBinBothRhs$3 = $spy(2);
      const tmpIfTest$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
      if (tmpIfTest$3) {
        $(`false`);
        break tmpSwitchBreak;
      } else {
      }
    }
  }
}
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $spy(0);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`false`);
} else {
  const tmpBinBothRhs$1 = $spy(1);
  const tmpIfTest$1 = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(`true`);
  } else {
    const tmpBinBothRhs$3 = $spy(2);
    const tmpIfTest$3 = tmpSwitchDisc === tmpBinBothRhs$3;
    if (tmpIfTest$3) {
      $(`false`);
    } else {
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $spy( 0 );
const c = a === b;
if (c) {
  $( "false" );
}
else {
  const d = $spy( 1 );
  const e = a === d;
  if (e) {
    $( "true" );
  }
  else {
    const f = $spy( 2 );
    const g = a === f;
    if (g) {
      $( "false" );
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'Creating spy', 1, 1, [0, 0]
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: 'Creating spy', 3, 1, [2, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
