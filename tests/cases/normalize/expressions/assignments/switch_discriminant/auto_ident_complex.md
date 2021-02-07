# Preval test case

# auto_ident_complex.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ((a = $(b))) {
  default:
    $(100);
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpNestedComplexRhs = $(b);
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
tmpSwitchBreak: {
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
let tmpSwitchTest;
const tmpNestedComplexRhs = $(1);
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
