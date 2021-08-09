# Preval test case

# auto_ident_new_prop_complex.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident new prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = new ($(b).$)(1)):
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = new ($(b).$)(1))) {
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
$(1);
const b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const tmpClusterSSA_a = new tmpNewCallee(1);
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
