# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
typeof $(x) && typeof $(x);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
typeof $(x) && typeof $(x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
const tmpIfTest = typeof tmpUnaryArg;
if (tmpIfTest) {
  const tmpUnaryArg$1 = $(x);
  typeof tmpUnaryArg$1;
} else {
}
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(1);
const tmpIfTest = typeof tmpUnaryArg;
if (tmpIfTest) {
  const tmpUnaryArg$1 = $(1);
  typeof tmpUnaryArg$1;
} else {
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
