# Preval test case

# auto_ident_complex.md

> normalize > expressions > statement > switch_discriminant > auto_ident_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(b)) {
  default:
    $(100);
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(b);
{
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(100);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
