# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Statement > Let > Auto ident unary excl simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let xyz = !arg;
$(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let xyz = !arg;
$(xyz);
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(false);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
