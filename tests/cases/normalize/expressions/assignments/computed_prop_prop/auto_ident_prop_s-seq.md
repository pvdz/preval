# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, b).c)];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, b).c)];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpAssignRhsProp = b;
a = tmpAssignRhsProp.c;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const obj = {};
obj[1];
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = {};
b[ 1 ];
$( 1, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
