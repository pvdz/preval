# Preval test case

# auto_ident_new_ident.md

> normalize > expressions > statement > objlit_dyn_prop > auto_ident_new_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ [new $(1)]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
new $(1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
new $(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
