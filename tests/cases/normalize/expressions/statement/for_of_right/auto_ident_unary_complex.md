# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of typeof $(x));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for (let x$1 of typeof $(x$1));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x$1);
const tmpForOfDeclRhs = typeof tmpUnaryArg;
let x$1 = undefined;
for (x$1 of tmpForOfDeclRhs) {
}
$(a, x);
`````

## Output

`````js filename=intro
throw `Preval: Cannot access \`x\$1\` before initialization`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
