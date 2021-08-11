# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > For b > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; --b; $(1));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  while (--b) {
    $(1);
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  b = b - 1;
  let tmpIfTest = b;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 0;
while (b) {
  $(1);
  b = b - 1;
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
