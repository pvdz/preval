# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $($)?.(1)):
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = $($)?.(1))) {
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
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
  a = tmpChainElementCall$1;
} else {
}
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
  $(tmpChainElementCall$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
