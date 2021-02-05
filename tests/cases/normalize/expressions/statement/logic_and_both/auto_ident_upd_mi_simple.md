# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > statement > logic_and_both > auto_ident_upd_mi_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
--b && --b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
  b = b - 1;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
  b = b - 1;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
