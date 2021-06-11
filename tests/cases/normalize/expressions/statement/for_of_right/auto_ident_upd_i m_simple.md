# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident upd i m simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x of b--);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for (let x of b--);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpForOfDeclRhs = tmpPostUpdArgIdent;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Output

`````js filename=intro
let x = undefined;
for (x of 1) {
}
const a = { a: 999, b: 1000 };
$(a, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
