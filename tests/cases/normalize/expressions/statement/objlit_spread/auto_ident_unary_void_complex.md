# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...void $(100) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...void $(100) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
