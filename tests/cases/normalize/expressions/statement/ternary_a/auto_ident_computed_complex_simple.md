# Preval test case

# auto_ident_computed_complex_simple.md

> normalize > expressions > statement > ternary_a > auto_ident_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(b)["c"] ? $(100) : $(200);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpIfTest = tmpCompObj.c;
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpIfTest = tmpCompObj.c;
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same