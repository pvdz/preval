# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Logic and left > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
typeof $(x) && $(100);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
typeof $(x) && $(100);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
const tmpIfTest = typeof tmpUnaryArg;
if (tmpIfTest) {
  $(100);
} else {
}
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(100);
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
