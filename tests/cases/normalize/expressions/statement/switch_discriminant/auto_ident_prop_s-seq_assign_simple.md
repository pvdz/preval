# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > statement > switch_discriminant > auto_ident_prop_s-seq_assign_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch (((1, 2, b).c = 2)) {
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
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpSwitchTest = tmpNestedPropAssignRhs;
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
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpSwitchTest = 2;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
