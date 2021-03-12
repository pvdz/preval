# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (1, 2, $(b)).$(1)):
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCallObj = $(b);
a = tmpCallObj.$(1);
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCallObj = $(b);
const SSA_a = tmpCallObj.$(1);
const tmpIfTest = SSA_a === tmpSwitchTest;
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
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
