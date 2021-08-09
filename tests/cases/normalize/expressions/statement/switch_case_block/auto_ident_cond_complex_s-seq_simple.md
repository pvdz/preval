# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Switch case block > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    $(1) ? (40, 50, 60) : $($(100));
  }
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      $(1) ? (40, 50, 60) : $($(100));
    }
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
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpCallCallee(tmpCalleeParam);
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam = $(100);
    $(tmpCalleeParam);
  }
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
