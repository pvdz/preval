# Preval test case

# try_finally_forin_break.md

> Try > Finally > Try finally forin break
>
> Finally transform checks

## Input

`````js filename=intro
for (const x in {a: 1}) {
  try {
    $(x, 1);
  } finally {
    $(2);
    break;
  }
}
$(3);
`````

## Pre Normal


`````js filename=intro
{
  let tmpForInGen = $forIn({ a: 1 });
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      const x = tmpForInNext.value;
      {
        {
          let $implicitThrow = false;
          let $finalCatchArg = undefined;
          $finally: {
            try {
              $(x, 1);
            } catch ($finalImplicit) {
              $implicitThrow = true;
              $finalCatchArg = $finalImplicit;
            }
          }
          {
            $(2);
            break;
          }
          if ($implicitThrow) throw $finalCatchArg;
          else {
          }
        }
      }
    }
  }
}
$(3);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = { a: 1 };
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x = tmpForInNext.value;
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    try {
      $(x, 1);
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
    $(2);
    break;
  }
}
$(3);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x /*:unknown*/ = tmpForInNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
    break;
  }
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { a: 1 };
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    try {
      $( e, 1 );
    }
    catch (f) {

    }
    $( 2 );
    break;
  }
}
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a', 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
