# Preval test case

# try_finally_switch_break.md

> Try > Finally > Try finally switch break
>
> Finally transform checks

## Input

`````js filename=intro
switch ($) {
  case $:
    try {
      $(x, 1);
    } finally {
      $(2);
      break;
    }
  default:
    $('oops');
}
$(3);
`````

## Pre Normal


`````js filename=intro
{
  const tmpSwitchValue = $;
  let tmpSwitchCaseToStart = 1;
  if ($ === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      {
        let $implicitThrow = false;
        let $finalCatchArg = undefined;
        $finally: {
          try {
            $(x, 1);
          } catch ($finalImplicit) {
            $implicitThrow = true;
            $finalCatchArg = $finalImplicit;
          }
        }
        {
          $(2);
          break tmpSwitchBreak;
        }
        if ($implicitThrow) throw $finalCatchArg;
        else {
        }
      }
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`oops`);
    }
  }
}
$(3);
`````

## Normalized


`````js filename=intro
const tmpSwitchValue = $;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = $ === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    try {
      $(x, 1);
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
    $(2);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      $(`oops`);
    } else {
    }
  }
}
$(3);
`````

## Output


`````js filename=intro
const tmpIfTest = $ === $;
if (tmpIfTest) {
  try {
    $(x, 1);
  } catch ($finalImplicit) {}
  $(2);
} else {
  $(`oops`);
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ === $;
if (a) {
  try {
    $( x, 1 );
  }
  catch (b) {

  }
  $( 2 );
}
else {
  $( "oops" );
}
$( 3 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
