# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > For a > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (++$($(b)).x; $(0); );
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  ++$($(b)).x;
  while ($(0)) {}
}
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
let tmpIfTest = $(0);
while (true) {
  if (tmpIfTest) {
    tmpIfTest = $(0);
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
const tmpCalleeParam = $(b);
const tmpAssignMemLhsObj = $(tmpCalleeParam);
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpIfTest = $(0);
if (tmpIfTest) {
  let tmpClusterSSA_tmpIfTest = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      tmpClusterSSA_tmpIfTest = $(0);
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
const c = $( a );
const d = $( c );
const e = d.x;
const f = e + 1;
d.x = f;
const g = $( 0 );
if (g) {
  let h = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (h) {
      h = $( 0 );
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
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
