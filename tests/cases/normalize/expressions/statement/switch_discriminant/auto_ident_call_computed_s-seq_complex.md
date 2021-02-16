# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> normalize > expressions > statement > switch_discriminant > auto_ident_call_computed_s-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((1, 2, b)[$("$")](1)) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpSwitchTest = tmpCallCompObj[tmpCallCompProp](1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompProp = $('$');
const tmpSwitchTest = b[tmpCallCompProp](1);
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
