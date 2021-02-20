# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Statement > Let > Auto ident unary void simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let xyz = void arg;
$(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let xyz = undefined;
$(xyz);
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(undefined);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
