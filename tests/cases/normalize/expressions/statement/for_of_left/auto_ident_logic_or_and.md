# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > For of left > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(0)) || ($($(1)) && $($(2)))).x of $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      ($($(0)) || ($($(1)) && $($(2)))).x = tmpForOfNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $forOf;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(0);
    let tmpAssignMemLhsObj = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpAssignMemLhsObj) {
    } else {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(1);
      tmpAssignMemLhsObj = tmpCallCallee$5(tmpCalleeParam$5);
      if (tmpAssignMemLhsObj) {
        const tmpCallCallee$7 = $;
        const tmpCalleeParam$7 = $(2);
        tmpAssignMemLhsObj = tmpCallCallee$7(tmpCalleeParam$7);
      } else {
      }
    }
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 = $(0);
    let tmpAssignMemLhsObj = $(tmpCalleeParam$3);
    if (tmpAssignMemLhsObj) {
    } else {
      const tmpCalleeParam$5 = $(1);
      tmpAssignMemLhsObj = $(tmpCalleeParam$5);
      if (tmpAssignMemLhsObj) {
        const tmpCalleeParam$7 = $(2);
        tmpAssignMemLhsObj = $(tmpCalleeParam$7);
      } else {
      }
    }
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
const c = $( b );
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( 0 );
    let h = $( g );
    if (h) {

    }
    else {
      const i = $( 1 );
      h = $( i );
      if (h) {
        const j = $( 2 );
        h = $( j );
      }
    }
    const k = h;
    const l = e.value;
    k.x = l;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
