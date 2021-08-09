# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = void arg;
  }
}
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = void arg;
    }
  } else {
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  a = undefined;
} else {
}
$(a, arg);
`````

## Output

`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(undefined, 1);
} else {
  const a = { a: 999, b: 1000 };
  $(a, 1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
