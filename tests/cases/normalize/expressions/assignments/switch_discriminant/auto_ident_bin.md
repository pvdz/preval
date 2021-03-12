# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = $(1) + $(2))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = (a = $(1) + $(2));
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(100);
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
a = tmpBinBothLhs + tmpBinBothRhs;
let tmpSwitchValue = a;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const SSA_a = tmpBinBothLhs + tmpBinBothRhs;
$(100);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
