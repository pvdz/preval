# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((--$($(b)).x).x in $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
for ((--$($(b)).x).x in $({ x: 1 }));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(b);
  const varInitAssignLhsComputedObj = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpAssignMemLhsObj = varInitAssignLhsComputedRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCalleeParam$1 = $(b);
  const varInitAssignLhsComputedObj = $(tmpCalleeParam$1);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  varInitAssignLhsComputedRhs.x = tmpForInLhsNode;
}
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
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e in d) {
  const f = $( a );
  const g = $( f );
  const h = g.x;
  const i = h - 1;
  g.x = i;
  i.x = e;
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on number '0' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
