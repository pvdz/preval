# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > For a > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (typeof x; $(0); );
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  typeof x;
  while ($(0)) {}
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest = $(0);
while (tmpIfTest) {
  tmpIfTest = $(0);
}
$(a, x);
`````

## Output

`````js filename=intro
let tmpIfTest = $(0);
while (tmpIfTest) {
  tmpIfTest = $(0);
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
