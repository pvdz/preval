# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = (1, 2, b)?.x;
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Settled


`````js filename=intro
$(1);
$(`fail1`);
$(`fail2`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`fail1`);
$(`fail2`);
`````

## Pre Normal


`````js filename=intro
{
  let b;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      b = { x: 1 };
      a = (1, 2, b)?.x;
      $(a);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`fail1`);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`fail2`);
    }
  }
}
`````

## Normalized


`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
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
if (tmpIfTest$3) {
  b = { x: 1 };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$5 = tmpChainRootProp != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
    $(tmpChainElementObject);
  } else {
    $(a);
  }
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $(`fail1`);
} else {
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$9) {
  $(`fail2`);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "fail1" );
$( "fail2" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
