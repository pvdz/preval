# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = --$($(b)).x));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = --$($(b)).x)) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const b = { x: 1 };
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = $(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
let tmpSSA_a = tmpNestedPropCompoundComplexRhs;
if (tmpNestedPropCompoundComplexRhs) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 = $(b);
    const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
    const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
    const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 - 1;
    tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
    tmpSSA_a = tmpNestedPropCompoundComplexRhs$1;
    if (tmpNestedPropCompoundComplexRhs$1) {
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
const b = { x: 1 };
const c = $( b );
const d = $( c );
const e = d.x;
const f = e - 1;
d.x = f;
let g = f;
if (f) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( b );
    const i = $( h );
    const j = i.x;
    const k = j - 1;
    i.x = k;
    g = k;
    if (k) {

    }
    else {
      break;
    }
  }
}
$( g, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
