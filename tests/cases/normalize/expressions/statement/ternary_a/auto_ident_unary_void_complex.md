# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Ternary a > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
void $(100) ? $(100) : $(200);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
void $(100) ? $(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
const tmpIfTest = undefined;
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(100);
if (undefined) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
