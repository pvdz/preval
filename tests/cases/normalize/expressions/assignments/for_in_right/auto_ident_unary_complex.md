# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = typeof $(x)));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for (let x$1 in (a = typeof $(x$1)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x$1);
a = typeof tmpUnaryArg;
let tmpForInDeclRhs = a;
let x$1;
for (x$1 in tmpForInDeclRhs) {
}
$(a, x);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(x$1);
const tmpSSA_a = typeof tmpUnaryArg;
let x$1;
for (x$1 in tmpSSA_a) {
}
$(tmpSSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
