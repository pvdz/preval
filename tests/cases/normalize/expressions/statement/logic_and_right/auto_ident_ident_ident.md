# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Logic and right > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$(100) && (b = 2);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$(100) && (b = 2);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  b = 2;
} else {
}
$(a, b, c);
`````

## Output

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, 2, 2);
} else {
  $(a, 1, 2);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
