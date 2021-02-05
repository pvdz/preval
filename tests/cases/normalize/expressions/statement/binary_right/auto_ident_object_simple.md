# Preval test case

# auto_ident_object_simple.md

> normalize > expressions > statement > binary_right > auto_ident_object_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + { x: 1, y: 2, z: 3 };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
1;
2;
3;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
