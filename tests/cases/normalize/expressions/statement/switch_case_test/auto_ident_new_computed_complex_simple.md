# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Statement > Switch case test > Auto ident new computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case new ($(b)["$"])(1):
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === new ($(b)[`\$`])(1)) {
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
const tmpBinBothRhs = new tmpNewCallee(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
$(1);
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
new tmpNewCallee(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
  a: 999,
  b: 1000,
};
$( 1 );
const c = $( a );
const d = c.$;
new d( 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
