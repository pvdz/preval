# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = (1, 2, $(b))[$("$")](1);
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = (1, 2, $(b))[$(`\$`)](1);
    }
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
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  a = tmpCallCompObj[tmpCallCompProp](1);
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const b = { $: $ };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  const tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
  $(tmpClusterSSA_a);
} else {
  const a = { a: 999, b: 1000 };
  $(a);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = { $: $ };
  const e = $( d );
  const f = $( "$" );
  const g = e[ f ]( 1 );
  $( g );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: '$'
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
