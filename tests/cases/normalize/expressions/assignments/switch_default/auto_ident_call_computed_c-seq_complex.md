# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (1, 2, $(b))[$("$")](1);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = (1, 2, $(b))[$('$')](1);
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  a = tmpCallCompObj[tmpCallCompProp](1);
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
$(1);
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const SSA_a = tmpCallCompObj[tmpCallCompProp](1);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
