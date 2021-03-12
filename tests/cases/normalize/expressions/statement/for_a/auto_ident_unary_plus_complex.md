# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > For a > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (+$(100); $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  +$(100);
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
+tmpUnaryArg;
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
+tmpUnaryArg;
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
