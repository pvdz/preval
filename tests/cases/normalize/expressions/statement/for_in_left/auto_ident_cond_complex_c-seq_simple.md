# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($(1) ? (40, 50, $(60)) : $($(100))).x in $({ x: 1 }));
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
      ($(1) ? (40, 50, $(60)) : $($(100))).x = tmpForInNext.value;
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
    let tmpAssignMemLhsObj = undefined;
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      tmpAssignMemLhsObj = $(60);
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(100);
      tmpAssignMemLhsObj = tmpCallCallee$3(tmpCalleeParam$3);
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
    const tmpIfTest$1 = $(1);
    let tmpAssignMemLhsObj$1 = undefined;
    if (tmpIfTest$1) {
      const tmpClusterSSA_tmpAssignMemLhsObj = $(60);
      tmpAssignMemLhsObj$1 = tmpClusterSSA_tmpAssignMemLhsObj;
    } else {
      const tmpCalleeParam$3 = $(100);
      const tmpClusterSSA_tmpAssignMemLhsObj$1 = $(tmpCalleeParam$3);
      tmpAssignMemLhsObj$1 = tmpClusterSSA_tmpAssignMemLhsObj$1;
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
    const f = $( 1 );
    let g = undefined;
    if (f) {
      const h = $( 60 );
      g = h;
    }
    else {
      const i = $( 100 );
      const j = $( i );
      g = j;
    }
    const k = d.value;
    g.x = k;
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
 - 2: 1
 - 3: 60
 - eval returned: ("<crash[ Cannot create property 'x' on number '60' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
