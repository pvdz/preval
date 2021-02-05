# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > assignments > switch_default > auto_ident_call_computed_c-seq_complex
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

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  {
    ('default case:');
    1;
    2;
    const tmpCallCompObj = $(b);
    const tmpCallCompProp = $('$');
    a = tmpCallCompObj[tmpCallCompProp](1);
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(1);
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
a = tmpCallCompObj[tmpCallCompProp](1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
