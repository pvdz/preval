# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Logic and right > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(100) && b++;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(100) && b++;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpPostUpdArgIdent = b;
  b = b + 1;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  b = b + 1;
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
