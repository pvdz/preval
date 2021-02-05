# Preval test case

# auto_ident_new_complex.md

> normalize > expressions > statement > switch_discriminant > auto_ident_new_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch (new ($($))(1)) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpSwitchTest = new tmpNewCallee(1);
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
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
new tmpNewCallee(1);
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
