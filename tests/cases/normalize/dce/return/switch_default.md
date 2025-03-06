# Preval test case

# switch_default.md

> Normalize > Dce > Return > Switch default
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('wrong branch');
      return;
    default:
      return $(2, 'ret');
      $('fail');
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(0)) {
      $(`wrong branch`);
      return;
    } else if (true) {
      return $(2, `ret`);
      $(`fail`);
    } else {
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(0);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(`wrong branch`);
    return undefined;
  } else {
    const tmpReturnArg = $(2, `ret`);
    return tmpReturnArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(0);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`wrong branch`);
} else {
  const tmpReturnArg /*:unknown*/ = $(2, `ret`);
  tmpCalleeParam = tmpReturnArg;
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1, "disc" );
const c = $( 0 );
const d = b === c;
if (d) {
  $( "wrong branch" );
}
else {
  const e = $( 2, "ret" );
  a = e;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
