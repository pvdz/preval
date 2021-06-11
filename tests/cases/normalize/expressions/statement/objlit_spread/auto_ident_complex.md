# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
({ ...$(b) });
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
({ ...$(b) });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpObjSpreadArg = $(b);
({ ...tmpObjSpreadArg });
$(a, b);
`````

## Output

`````js filename=intro
const tmpObjSpreadArg = $(1);
({ ...tmpObjSpreadArg });
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
