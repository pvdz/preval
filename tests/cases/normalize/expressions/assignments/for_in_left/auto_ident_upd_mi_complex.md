# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

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
{
  let tmpForInGen = $forIn($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      (a = --$($(b)).x).x = tmpForInNext.value;
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $forIn;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
let tmpForInGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(b);
    const tmpNestedAssignObj = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpBinLhs = tmpNestedAssignObj.x;
    const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
    tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
    a = tmpNestedPropCompoundComplexRhs;
    let tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(b);
    const tmpNestedAssignObj /*:unknown*/ = $(tmpCalleeParam$3);
    const tmpBinLhs /*:unknown*/ = tmpNestedAssignObj.x;
    const tmpNestedPropCompoundComplexRhs /*:number*/ = tmpBinLhs - 1;
    tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
    a = tmpNestedPropCompoundComplexRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpNestedPropCompoundComplexRhs.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
const c = $( b );
const d = $forIn( c );
const e = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d.next();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    const h = $( e );
    const i = $( h );
    const j = i.x;
    const k = j - 1;
    i.x = k;
    a = k;
    const l = f.value;
    k.x = l;
  }
}
$( a, e );
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
