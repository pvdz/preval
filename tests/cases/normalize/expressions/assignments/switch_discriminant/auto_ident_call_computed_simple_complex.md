# Preval test case

# auto_ident_call_computed_simple_complex.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_call_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((a = b[$("$")](1))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
{
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 100
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
