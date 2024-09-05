# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(0)) || $($(2))).x in $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      ($($(0)) || $($(2))).x = tmpForInNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
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
    const tmpCalleeParam$3 = $(0);
    let tmpAssignMemLhsObj = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpAssignMemLhsObj) {
    } else {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(2);
      tmpAssignMemLhsObj = tmpCallCallee$5(tmpCalleeParam$5);
    }
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 = $(0);
    const tmpAssignMemLhsObj = $(tmpCalleeParam$3);
    let tmpAssignMemLhsObj$1 = undefined;
    if (tmpAssignMemLhsObj) {
      tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    } else {
      const tmpCalleeParam$5 = $(2);
      const tmpClusterSSA_tmpAssignMemLhsObj = $(tmpCalleeParam$5);
      tmpAssignMemLhsObj$1 = tmpClusterSSA_tmpAssignMemLhsObj;
    }
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = $( 0 );
    const g = $( f );
    let h = undefined;
    if (g) {
      h = g;
    }
    else {
      const i = $( 2 );
      const j = $( i );
      h = j;
    }
    const k = d.value;
    h.x = k;
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
