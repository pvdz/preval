# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Switch case test > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)):
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === ((10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))) {
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
let tmpBinBothRhs = undefined;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  tmpBinBothRhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
}
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  $(60);
} else {
  const tmpCalleeParam = $(100);
  $(tmpCalleeParam);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
