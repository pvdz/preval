# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > statement > ternary_a > auto_ident_unary_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
typeof x ? $(100) : $(200);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = typeof x;
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
