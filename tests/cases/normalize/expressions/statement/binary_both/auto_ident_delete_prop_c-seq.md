# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > binary_both > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), $(arg)).y + delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$(1);
$(2);
const tmpDeleteObj$1 = $(arg);
delete tmpDeleteObj$1.y;
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$(1);
$(2);
const tmpDeleteObj$1 = $(arg);
delete tmpDeleteObj$1.y;
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 1
 - 5: 2
 - 6: {}
 - 7: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
