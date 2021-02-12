# Preval test case

# auto_ident_unary_minus_simple.md

> normalize > expressions > statement > logic_or_left > auto_ident_unary_minus_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
-x || $(100);
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = -x;
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = -x;
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
