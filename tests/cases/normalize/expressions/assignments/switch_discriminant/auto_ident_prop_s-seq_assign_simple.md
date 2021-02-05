# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_prop_s-seq_assign_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ((a = (1, 2, b).c = 2)) {
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
let tmpNestedComplexRhs;
1;
2;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
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
let tmpNestedComplexRhs;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
$(100);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 2, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
