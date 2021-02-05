# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > statement > objlit_dyn_prop > auto_ident_prop_s-seq_assign_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
({ [((1, 2, b).c = 2)]: 10 });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
1;
2;
const tmpAssignMemLhsObj = b;
tmpAssignMemLhsObj.c = 2;
10;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignMemLhsObj = b;
tmpAssignMemLhsObj.c = 2;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
