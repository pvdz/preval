# Preval test case

# auto_ident_prop_s-seq.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ((a = (1, 2, b).c)) {
  default:
    $(100);
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
1;
2;
const tmpCompObj = b;
const tmpNestedComplexRhs = tmpCompObj.c;
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
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
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpCompObj = b;
const tmpNestedComplexRhs = tmpCompObj.c;
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
$(100);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
