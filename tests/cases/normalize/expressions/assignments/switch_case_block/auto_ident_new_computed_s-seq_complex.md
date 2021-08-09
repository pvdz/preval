# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = new (1, 2, b)[$("$")](1);
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
      a = new (1, 2, b)[$(`\$`)](1);
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
  const tmpCompObj = b;
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  a = new tmpNewCallee(1);
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
  const tmpCompProp = $(`\$`);
  const b = { $: $ };
  const tmpNewCallee = b[tmpCompProp];
  const tmpClusterSSA_a = new tmpNewCallee(1);
  $(tmpClusterSSA_a);
} else {
  const a = { a: 999, b: 1000 };
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
