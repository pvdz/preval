# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > binary_left > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), $(arg)).y + $(100);
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$(100);
$(a, x);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$(100);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 100
 - 5: { a: '999', b: '1000' }, undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
