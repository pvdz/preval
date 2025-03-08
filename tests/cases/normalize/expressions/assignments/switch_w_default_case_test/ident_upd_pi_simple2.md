# Preval test case

# ident_upd_pi_simple2.md

> Normalize > Expressions > Assignments > Switch w default case test > Ident upd pi simple2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(2)) {
  case (a = ++b):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b);
`````

## Settled


`````js filename=intro
$(2);
$(`fail1`);
$(`fail2`);
$(2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(`fail1`);
$(`fail2`);
$(2, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(2);
  let tmpSwitchCaseToStart = 1;
  if ((a = ++b) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`fail1`);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`fail2`);
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(2);
let tmpSwitchCaseToStart = 1;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = b;
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $(`fail2`);
} else {
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( "fail1" );
$( "fail2" );
$( 2, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
