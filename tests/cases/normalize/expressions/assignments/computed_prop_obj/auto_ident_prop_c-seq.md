# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = (1, 2, $(b)).c)["a"];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
let a = { a: 999, b: 1000 };
const obj = {};
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
const tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
