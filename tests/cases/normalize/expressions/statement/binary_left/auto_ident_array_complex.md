# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > statement > binary_left > auto_ident_array_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[$(1), 2, $(3)] + $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(3);
$(100);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(3);
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same