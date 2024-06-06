# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident upd mi complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: 1 };

  let a = --$($(b)).x;
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = { x: 1 };
  let a = --$($(b)).x;
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam = $(b);
const varInitAssignLhsComputedObj = $(tmpCalleeParam);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b);
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
$( e, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
