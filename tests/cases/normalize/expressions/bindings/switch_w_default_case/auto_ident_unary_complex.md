# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident unary complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1;

    let a = typeof $(x);
    $(a, x);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Pre Normal

`````js filename=intro
{
  let x;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      x = 1;
      a = typeof $(x);
      $(a, x);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
`````

## Normalized

`````js filename=intro
let x;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  x = 1;
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
  $(a, x);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
$(a, 1);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
