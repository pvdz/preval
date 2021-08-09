# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Statement > Switch case test > Auto ident computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case b["c"]:
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === b[`c`]) {
  } else {
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = b.c;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
$(1);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
