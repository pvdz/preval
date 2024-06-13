# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((a = --$($(b)).x).x in $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
for ((a = --$($(b)).x).x in $({ x: 1 }));
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
  const tmpNestedAssignObj = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCalleeParam$1 = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam$1);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  tmpNestedPropCompoundComplexRhs.x = tmpForInLhsNode;
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
let b = {
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
  b = i;
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
