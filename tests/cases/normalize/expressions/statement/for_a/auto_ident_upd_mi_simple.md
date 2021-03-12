# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > For a > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (--b; $(0); );
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  --b;
  while ($(0)) {}
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
