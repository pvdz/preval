# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident logic and complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(1)) && 2;
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(2);
  $(`fail1`);
  $(`fail2`);
} else {
  $(a);
  $(`fail1`);
  $(`fail2`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
if (a) {
  $(2);
  $(`fail1`);
  $(`fail2`);
} else {
  $(a);
  $(`fail1`);
  $(`fail2`);
}
`````

## Pre Normal


`````js filename=intro
{
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = $($(1)) && 2;
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
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    a = 2;
    $(a);
  } else {
    $(a);
  }
} else {
}
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
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  $( 2 );
  $( "fail1" );
  $( "fail2" );
}
else {
  $( b );
  $( "fail1" );
  $( "fail2" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
