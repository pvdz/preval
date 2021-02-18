# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > statement > let > auto_ident_upd_mi_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let xyz = --b;
$(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
let xyz = b;
$(xyz);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(0);
$(a, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
