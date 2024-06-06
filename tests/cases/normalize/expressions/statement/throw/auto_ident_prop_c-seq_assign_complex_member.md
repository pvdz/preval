# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Statement > Throw > Auto ident prop c-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
throw ((1, 2, $(b)).c = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
throw ((1, 2, $(b)).c = $(b)[$(`d`)]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpThrowArg = varInitAssignLhsComputedRhs;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
throw varInitAssignLhsComputedRhs;
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
c: 10,
d: 20
;
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
throw e;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - eval returned: ('<crash[ 20 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
