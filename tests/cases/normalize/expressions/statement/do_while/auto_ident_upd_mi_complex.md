# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
while (true) {
  {
    $(100);
  }
  if (--$($(b)).x) {
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
  const varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpIfTest = varInitAssignLhsComputedRhs;
  if (tmpIfTest) {
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
const varInitAssignLhsComputedObj = $(tmpCalleeParam);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 = $(b);
    const varInitAssignLhsComputedObj$1 = $(tmpCalleeParam$1);
    const tmpBinLhs$1 = varInitAssignLhsComputedObj$1.x;
    const varInitAssignLhsComputedRhs$1 = tmpBinLhs$1 - 1;
    varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
    if (varInitAssignLhsComputedRhs$1) {
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
  b: 1000,
};
$( 100 );
const c = $( a );
const d = $( c );
const e = d.x;
const f = e - 1;
d.x = f;
if (f) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( a );
    const h = $( g );
    const i = h.x;
    const j = i - 1;
    h.x = j;
    if (j) {

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
