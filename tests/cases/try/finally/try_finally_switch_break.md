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

## Settled


`````js filename=intro
try {
  $(x, 1);
} catch ($finalImplicit) {}
$(2);
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(x, 1);
} catch ($finalImplicit) {}
$(2);
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
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
  }
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

## PST Settled
With rename=true

`````js filename=intro
try {
  $( x, 1 );
}
catch (a) {

}
$( 2 );
$( 3 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
