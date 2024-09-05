# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x of --$($(b)).x);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf(--$($(b)).x);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x = tmpForOfNext.value;
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $forOf;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const varInitAssignLhsComputedObj = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x = tmpForOfNext.value;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam$1 = $(b);
const varInitAssignLhsComputedObj = $(tmpCalleeParam$1);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpForOfGen = $forOf(varInitAssignLhsComputedRhs);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
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
const e = d - 1;
c.x = e;
const f = $forOf( e );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = f.next();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    g.value;
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
