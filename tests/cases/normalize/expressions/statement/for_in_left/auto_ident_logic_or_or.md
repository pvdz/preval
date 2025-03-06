# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > For in left > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(0)) || $($(1)) || $($(2))).x in $({ x: 1 }));
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
      ($($(0)) || $($(1)) || $($(2))).x = tmpForInNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
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
      } else {
        const tmpCalleeParam$7 = $(2);
        tmpAssignMemLhsObj = $(tmpCalleeParam$7);
      }
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
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(0);
    let tmpAssignMemLhsObj /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpAssignMemLhsObj) {
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(1);
      tmpAssignMemLhsObj = $(tmpCalleeParam$5);
      if (tmpAssignMemLhsObj) {
      } else {
        const tmpCalleeParam$7 /*:unknown*/ = $(2);
        tmpAssignMemLhsObj = $(tmpCalleeParam$7);
      }
    }
    const tmpAssignMemLhsObj$1 /*:unknown*/ = tmpAssignMemLhsObj;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
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
    let g = $( f );
    if (g) {

    }
    else {
      const h = $( 1 );
      g = $( h );
      if (g) {

      }
      else {
        const i = $( 2 );
        g = $( i );
      }
    }
    const j = g;
    const k = d.value;
    j.x = k;
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
 - 4: 1
 - 5: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next