# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Stmt global top > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
--$($(b)).x;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
--$($(b)).x;
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
const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
const tmpAssignMemLhsObj = $(tmpCalleeParam);
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( a );
const d = $( c );
const e = d.x;
const f = e - 1;
d.x = f;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
