# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_delete_computed_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
switch ((a = delete $(x)[$("y")])) {
  default:
    $(100);
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = $('y');
const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    $(100);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: 100
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
