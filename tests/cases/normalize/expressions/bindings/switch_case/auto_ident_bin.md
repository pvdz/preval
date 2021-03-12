# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Bindings > Switch case > Auto ident bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1) + $(2);
    $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = $(1) + $(2);
      $(a);
    }
  }
}
`````

## Normalized

`````js filename=intro
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  a = tmpBinBothLhs + tmpBinBothRhs;
  $(a);
}
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const a = tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
