# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > If > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
if ((a = b--));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
if ((a = b--));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b - 1;
a = tmpPostUpdArgIdent;
let tmpIfTest = a;
$(a, b);
`````

## Output

`````js filename=intro
$(1, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
