# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Statement > Switch case test > Auto ident new computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case new b[$("$")](1):
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === new b[$(`\$`)](1)) {
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
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpBinBothRhs = new tmpNewCallee(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
$(1);
const tmpCompProp = $(`\$`);
const tmpNewCallee = b[tmpCompProp];
new tmpNewCallee(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
