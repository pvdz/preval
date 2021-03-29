# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Logic and both > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
(b = $(2)) && (b = $(2));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
(b = $(2)) && (b = $(2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpIfTest = b;
if (tmpIfTest) {
  b = $(2);
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpSSA_b = $(2);
const tmpIfTest = tmpSSA_b;
if (tmpIfTest) {
  tmpSSA_b = $(2);
}
$(a, tmpSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
