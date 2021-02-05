# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > statement > logic_and_left > auto_ident_upd_i m_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
b-- && $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpIfTest = tmpPostUpdArgIdent;
if (tmpIfTest) {
  $(100);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpIfTest = tmpPostUpdArgIdent;
if (tmpIfTest) {
  $(100);
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
