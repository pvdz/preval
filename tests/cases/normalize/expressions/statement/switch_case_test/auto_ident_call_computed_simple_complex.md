# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Switch case test > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case b[$("$")](1):
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === b[$(`\$`)](1)) {
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
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
const tmpBinBothRhs = tmpCallCompObj[tmpCallCompProp](1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
$(1);
const tmpCallCompProp = $(`\$`);
b[tmpCallCompProp](1);
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
const c = $( "$" );
a[ c ]( 1 );
$( b );
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
