# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Statement > Let > Auto ident array simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = [1, 2, 3];
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = [1, 2, 3];
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = [1, 2, 3];
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const xyz = [1, 2, 3];
$(xyz);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
