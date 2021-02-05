# Preval test case

# auto_ident_ident.md

> normalize > expressions > statement > objlit_dyn_prop > auto_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
({ [b]: 10 });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b;
10;
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
