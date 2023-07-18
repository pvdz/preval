# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Arr element > Auto ident prop simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = b.c = $(b)[$("d")]) + (a = b.c = $(b)[$("d")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$((a = b.c = $(b)[$(`d`)]) + (a = b.c = $(b)[$(`d`)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpBinBothLhs = a;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
b.c = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
b.c = tmpNestedAssignPropRhs$1;
const tmpCalleeParam = tmpNestedAssignPropRhs + tmpNestedAssignPropRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignPropRhs$1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
c: 10,
d: 20
;
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
const e = $( a );
const f = $( "d" );
const g = e[ f ];
a.c = g;
const h = d + g;
$( h );
$( g, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: { c: '20', d: '20' }
 - 4: 'd'
 - 5: 40
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
