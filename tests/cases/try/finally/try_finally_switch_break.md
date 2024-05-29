# Preval test case

# try_finally_switch_break.md

> Try > Finally > Try finally switch break
>
> Finally transform checks

#TODO

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
      try {
        $(x, 1);
      } finally {
        $(2);
        break tmpSwitchBreak;
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
    try {
      $(x, 1);
    } finally {
      $(2);
      break tmpSwitchBreak;
    }
  } else {
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
    $(`oops`);
  } else {
  }
}
$(3);
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 1;
const tmpIfTest = $ === $;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    try {
      $(x, 1);
    } finally {
      $(2);
      break tmpSwitchBreak;
    }
  } else {
  }
  $(`oops`);
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $ === $;
if (b) {
  a = 0;
}
tmpSwitchBreak: {
  const c = a <= 0;
  if (c) {
    try {
      $( x, 1 );
    }
finally {
      $( 2 );
      break tmpSwitchBreak;
    }
  }
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
