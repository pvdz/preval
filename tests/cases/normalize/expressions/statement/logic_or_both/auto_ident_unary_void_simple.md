# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > statement > logic_or_both > auto_ident_unary_void_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
void arg || void arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = undefined;
if (tmpIfTest) {
} else {
  undefined;
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
if (undefined) {
} else {
  undefined;
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
