# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident prop s-seq assign simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, b).c = 2)];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, b).c = 2)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 2 };
const obj = {};
obj[2];
$(2, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 2 };
const b = {};
b[ 2 ];
$( 2, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
