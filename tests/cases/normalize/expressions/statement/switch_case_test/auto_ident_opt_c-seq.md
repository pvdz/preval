# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Switch case test > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (1, 2, $(b))?.x:
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (1, 2, $(b))?.x) {
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
let tmpBinBothRhs = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpBinBothRhs = tmpChainElementObject;
} else {
}
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
$(1);
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  tmpChainRootProp.x;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
