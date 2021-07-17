# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > While > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while (!$(100)) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while (!$(100)) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
let tmpIfTest = !tmpUnaryArg;
while (tmpIfTest) {
  $(100);
  const tmpUnaryArg$1 = $(100);
  tmpIfTest = !tmpUnaryArg$1;
}
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
let tmpIfTest = !tmpUnaryArg;
while (tmpIfTest) {
  $(100);
  const tmpUnaryArg$1 = $(100);
  tmpIfTest = !tmpUnaryArg$1;
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
