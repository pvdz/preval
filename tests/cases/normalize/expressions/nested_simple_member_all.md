# Preval test case

# nested_simple_member_all.md

> Normalize > Expressions > Nested simple member all
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = {x:1}, b = {x:2}, c = {x:3};
$($(a).x = $(b).x = $(c).x);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = { x: 1 }), (b = { x: 2 }), (c = { x: 3 });
$(($(a).x = $(b).x = $(c).x));
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
const tmpCallCallee = $;
const varInitAssignLhsComputedObj = $(a);
const varInitAssignLhsComputedObj$1 = $(b);
const tmpCompObj = $(c);
const varInitAssignLhsComputedRhs$1 = tmpCompObj.x;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a = { x: 1 };
const b = { x: 2 };
const c = { x: 3 };
const varInitAssignLhsComputedObj = $(a);
const varInitAssignLhsComputedObj$1 = $(b);
const tmpCompObj = $(c);
const varInitAssignLhsComputedRhs$1 = tmpCompObj.x;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
$(varInitAssignLhsComputedRhs$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { x: 2 };
const c = { x: 3 };
const d = $( a );
const e = $( b );
const f = $( c );
const g = f.x;
e.x = g;
d.x = g;
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '2' }
 - 3: { x: '3' }
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
