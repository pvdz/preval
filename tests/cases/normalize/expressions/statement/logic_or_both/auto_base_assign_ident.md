# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > statement > logic_or_both > auto_base_assign_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
(b = $(2)) || (b = $(2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
} else {
  b = $(2);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
} else {
  b = $(2);
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
