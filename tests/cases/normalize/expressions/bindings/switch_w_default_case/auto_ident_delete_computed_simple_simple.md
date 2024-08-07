# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident delete computed simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete arg["y"];
    $(a, arg);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Pre Normal


`````js filename=intro
{
  let arg;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      arg = { y: 1 };
      a = delete arg[`y`];
      $(a, arg);
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
let arg = undefined;
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
  arg = { y: 1 };
  a = delete arg.y;
  $(a, arg);
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

## Output


`````js filename=intro
const arg = { y: 1 };
const a = delete arg.y;
$(a, arg);
$(`fail1`);
$(`fail2`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
$( b, a );
$( "fail1" );
$( "fail2" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, {}
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
