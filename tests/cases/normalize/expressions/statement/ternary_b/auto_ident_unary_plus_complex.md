# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? +$(100) : $(200);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? +$(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpUnaryArg = $(100);
  +tmpUnaryArg;
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpUnaryArg = $(100);
  +tmpUnaryArg;
} else {
  $(200);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
