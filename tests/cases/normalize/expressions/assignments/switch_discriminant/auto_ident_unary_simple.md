# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_unary_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ((a = typeof x)) {
  default:
    $(100);
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpNestedComplexRhs = typeof x;
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
{
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
a = 'number';
tmpSwitchTest = 'number';
$(100);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
