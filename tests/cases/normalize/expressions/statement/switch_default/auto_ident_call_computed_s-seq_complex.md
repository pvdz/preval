# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Switch default > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    (1, 2, b)[$("$")](1);
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
      (1, 2, b)[$('$')](1);
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
  const tmpCallCompObj = b;
  const tmpCallCompProp = $('$');
  tmpCallCompObj[tmpCallCompProp](1);
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
$(1);
const tmpCallCompProp = $('$');
b[tmpCallCompProp](1);
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
