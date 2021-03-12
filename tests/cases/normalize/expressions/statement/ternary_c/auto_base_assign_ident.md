# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Ternary c > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(0) ? $(100) : (b = $(2));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(0) ? $(100) : (b = $(2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b = $(2);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  b = $(2);
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 2
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
