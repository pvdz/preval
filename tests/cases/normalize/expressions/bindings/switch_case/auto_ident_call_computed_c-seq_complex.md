# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident call computed c-seq complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = (1, 2, $(b))[$("$")](1);
    $(a);
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { $: $ };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $('$');
  a = tmpCallCompObj[tmpCallCompProp](1);
  $(a);
}
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const a = tmpCallCompObj[tmpCallCompProp](1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
