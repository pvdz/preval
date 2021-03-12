# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $?.(1)):
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest$1 = tmpChainRootCall != null;
if (tmpIfTest$1) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
}
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
let SSA_a = undefined;
const tmpIfTest$1 = $ != null;
if (tmpIfTest$1) {
  const tmpChainElementCall = $(1);
  SSA_a = tmpChainElementCall;
}
const tmpBinLhs = SSA_a;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchCaseToStart <= 0;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
