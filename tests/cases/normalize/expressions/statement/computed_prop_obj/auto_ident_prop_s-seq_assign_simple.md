# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
((1, 2, b).c = 2)["a"];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
((1, 2, b).c = 2)[`a`];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedRhs = 2;
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpCompObj = varInitAssignLhsComputedRhs;
tmpCompObj.a;
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 2 };
const a = { a: 999, b: 1000 };
(2).a;
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 2 };
const b = {
a: 999,
b: 1000
;
2.a;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
