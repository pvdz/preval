# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
({ ...typeof x });
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
({ ...typeof x });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
typeof x;
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
