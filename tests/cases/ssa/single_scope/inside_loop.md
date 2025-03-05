# Preval test case

# inside_loop.md

> Ssa > Single scope > Inside loop
>
> If the decl happens inside a loop the SSA should still be able to proceed

## Input

`````js filename=intro
for (let styleName$5 in {x:100}) {
  let checkme = $(1);
  if (checkme) {
    checkme = $(2); // SSA here
    if (checkme) {
      $(3)
    }
  }
}
`````

## Pre Normal


`````js filename=intro
{
  let tmpForInGen = $forIn({ x: 100 });
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      let styleName$5 = tmpForInNext.value;
      {
        let checkme = $(1);
        if (checkme) {
          checkme = $(2);
          if (checkme) {
            $(3);
          }
        }
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = { x: 100 };
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let styleName$5 = tmpForInNext.value;
    let checkme = $(1);
    if (checkme) {
      checkme = $(2);
      if (checkme) {
        $(3);
      } else {
      }
    } else {
    }
  }
}
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: 100 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
    const checkme /*:unknown*/ = $(1);
    if (checkme) {
      const tmpClusterSSA_checkme /*:unknown*/ = $(2);
      if (tmpClusterSSA_checkme) {
        $(3);
      } else {
      }
    } else {
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 100 };
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
    const e = $( 1 );
    if (e) {
      const f = $( 2 );
      if (f) {
        $( 3 );
      }
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
