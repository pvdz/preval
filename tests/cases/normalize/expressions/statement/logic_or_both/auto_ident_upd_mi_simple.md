# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
--b || --b;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
--b || --b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
let tmpIfTest = b;
if (tmpIfTest) {
} else {
  b = b - 1;
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpSSA_b = 0;
const tmpIfTest = tmpSSA_b;
if (tmpIfTest) {
} else {
  tmpSSA_b = tmpSSA_b - 1;
}
$(a, tmpSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
