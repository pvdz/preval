# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Label > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
label: ++$($(b)).x;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
label: ++$($(b)).x;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 1;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam = $(b);
const tmpAssignMemLhsObj = $(tmpCalleeParam);
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
