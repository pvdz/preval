# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Switch case test > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $($(0)) || 2:
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === ($($(0)) || 2)) {
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
if (tmpBinBothRhs) {
} else {
  tmpBinBothRhs = 2;
}
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $(0);
$(tmpCalleeParam);
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
