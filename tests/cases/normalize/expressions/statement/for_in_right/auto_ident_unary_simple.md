# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > For in right > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x in typeof x);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for (let x$1 in typeof x$1);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpForInDeclRhs = typeof x$1;
let x$1 = undefined;
for (x$1 in tmpForInDeclRhs) {
}
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpForInDeclRhs = typeof x$1;
let x$1 = undefined;
for (x$1 in tmpForInDeclRhs) {
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
