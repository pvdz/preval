# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = (1, 2, $(b))?.x;
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = (1, 2, $(b))?.x;
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  a = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
  } else {
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  a = undefined;
  const b = { x: 1 };
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
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
 - 3: { x: '1' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
