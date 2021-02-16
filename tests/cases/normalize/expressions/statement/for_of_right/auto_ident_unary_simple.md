# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_unary_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of typeof x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = typeof x_1;
let x_1;
for (x_1 of tmpForOfDeclRhs) {
}
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = typeof x_1;
let x_1;
for (x_1 of tmpForOfDeclRhs) {
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
