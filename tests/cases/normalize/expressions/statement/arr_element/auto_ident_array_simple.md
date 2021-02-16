# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > statement > arr_element > auto_ident_array_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[1, 2, 3] + [1, 2, 3];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
