# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > For in left > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = ($($(1)) && $($(1))) || $($(2))).x in $({ x: 1 }));
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
      (a = ($($(1)) && $($(1))) || $($(2))).x = tmpForInNext.value;
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
    const tmpCalleeParam$3 = $(1);
    a = tmpCallCallee$3(tmpCalleeParam$3);
    if (a) {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(1);
      a = tmpCallCallee$5(tmpCalleeParam$5);
    } else {
    }
    if (a) {
    } else {
      const tmpCallCallee$7 = $;
      const tmpCalleeParam$7 = $(2);
      a = tmpCallCallee$7(tmpCalleeParam$7);
    }
    let tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 = $(1);
    a = $(tmpCalleeParam$3);
    if (a) {
      const tmpCalleeParam$5 = $(1);
      a = $(tmpCalleeParam$5);
    } else {
    }
    let tmpAssignMemLhsObj = undefined;
    if (a) {
      tmpAssignMemLhsObj = a;
    } else {
      const tmpCalleeParam$7 = $(2);
      const tmpClusterSSA_a = $(tmpCalleeParam$7);
      tmpAssignMemLhsObj = tmpClusterSSA_a;
    }
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
}
$(a);
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( 1 );
    a = $( g );
    if (a) {
      const h = $( 1 );
      a = $( h );
    }
    let i = undefined;
    if (a) {
      i = a;
    }
    else {
      const j = $( 2 );
      const k = $( j );
      i = k;
    }
    const l = e.value;
    i.x = l;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
