# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, $(b)).c)];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, $(b)).c)];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const obj = {};
const tmpAssignRhsProp = $(b);
const SSA_a = tmpAssignRhsProp.c;
obj[SSA_a];
$(SSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
