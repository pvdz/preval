# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Label > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
label: a = $($(b)).x--;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
label: a = $($(b)).x--;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = tmpPostUpdArgVal;
$(a, b);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam);
const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
const tmpAssignMemRhs /*:number*/ = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
$(tmpPostUpdArgVal, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d - 1;
c.x = e;
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
