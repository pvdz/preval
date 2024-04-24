# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (--$($(b)).x);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = --$($(b)).x;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = tmpNestedAssignObj.x;
    const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
    tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
    tmpDoWhileFlag = tmpNestedPropCompoundComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
$(100);
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = $(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
let tmpSSA_tmpDoWhileFlag = tmpNestedPropCompoundComplexRhs;
if (tmpNestedPropCompoundComplexRhs) {
  $(100);
  const tmpCalleeParam$1 = $(b);
  const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
  const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
  const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 - 1;
  tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedPropCompoundComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = $(b);
      const tmpNestedAssignObj$2 = $(tmpCalleeParam$2);
      const tmpBinLhs$2 = tmpNestedAssignObj$2.x;
      const tmpNestedPropCompoundComplexRhs$2 = tmpBinLhs$2 - 1;
      tmpNestedAssignObj$2.x = tmpNestedPropCompoundComplexRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedPropCompoundComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
$( 100 );
const c = $( a );
const d = $( c );
const e = d.x;
const f = e - 1;
d.x = f;
let g = f;
if (f) {
  $( 100 );
  const h = $( a );
  const i = $( h );
  const j = i.x;
  const k = j - 1;
  i.x = k;
  g = k;
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      const l = $( a );
      const m = $( l );
      const n = m.x;
      const o = n - 1;
      m.x = o;
      g = o;
    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
