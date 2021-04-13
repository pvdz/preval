# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) + (a = $?.(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) + (a = $?.(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpIfTest$1 = tmpChainRootCall$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = tmpChainRootCall$1(1);
  a = tmpChainElementCall$1;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let tmpSSA_a = undefined;
const tmpIfTest = $ != null;
if (tmpIfTest) {
  const tmpChainElementCall = $(1);
  tmpSSA_a = tmpChainElementCall;
} else {
}
const tmpBinBothLhs = tmpSSA_a;
let tmpSSA_a$1 = undefined;
const tmpIfTest$1 = $ != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = $(1);
  tmpSSA_a$1 = tmpChainElementCall$1;
} else {
}
const tmpBinBothRhs = tmpSSA_a$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(tmpSSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
