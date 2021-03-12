# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident unary complex
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
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      x = 1;
      a = typeof $(x);
      $(a, x);
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
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  x = 1;
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
  $(a, x);
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
