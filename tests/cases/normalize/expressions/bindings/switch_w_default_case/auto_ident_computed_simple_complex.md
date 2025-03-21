# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = b[$("c")];
    $(a, b);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const tmpClusterSSA_b /*:object*/ = { c: 1 };
const tmpClusterSSA_a /*:unknown*/ = tmpClusterSSA_b[tmpAssignRhsCompProp];
$(tmpClusterSSA_a, tmpClusterSSA_b);
$(`fail1`);
$(`fail2`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const tmpClusterSSA_b = { c: 1 };
$(tmpClusterSSA_b[tmpAssignRhsCompProp], tmpClusterSSA_b);
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
      b = { c: 1 };
      a = b[$(`c`)];
      $(a, b);
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
  b = { c: 1 };
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  $(a, b);
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
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( c, b );
$( "fail1" );
$( "fail2" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
