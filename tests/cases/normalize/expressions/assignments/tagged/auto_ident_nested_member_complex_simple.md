# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$`before ${(a = $(b)[$("x")] = $(c)[$("y")] = d)} after`;
$(a, b, c, d);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $(b)[$(`x`)] = $(c)[$(`y`)] = d));
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
const varInitAssignLhsComputedRhs = d;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b, c, d);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const tmpCalleeParam = [`before `, ` after`];
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
$(tmpCalleeParam, 3);
$(3, b, c, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = [ "before ", " after" ];
const d = $( a );
const e = $( "x" );
const f = $( b );
const g = $( "y" );
f[g] = 3;
d[e] = 3;
$( c, 3 );
$( 3, a, b, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: ['before ', ' after'], 3
 - 6: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
