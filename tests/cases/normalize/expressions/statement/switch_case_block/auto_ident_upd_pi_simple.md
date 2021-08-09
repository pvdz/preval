# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Switch case block > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    ++b;
  }
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      ++b;
    }
  } else {
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  b = b + 1;
} else {
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(a, 2);
} else {
  $(a, 1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
