# Preval test case

# for_in_known_object.md

> Tofix > For in known object
>
> If we know the object then we should be able to simplify $forIn

## Input

`````js filename=intro
const obj = { x: 1, y: 'two' };
for (const key in obj) {
  $('key', key);
}
$('done');
`````

## Pre Normal


`````js filename=intro
const obj = { expires: expires };
{
  let tmpForInGen = $forIn(obj);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      const key = tmpForInNext.value;
      {
        $(`key`, key);
      }
    }
  }
}
$(`done`);
`````

## Normalized


`````js filename=intro
const obj = { expires: expires };
let tmpForInGen = $forIn(obj);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key = tmpForInNext.value;
    $(`key`, key);
  }
}
$(`done`);
`````

## Output


`````js filename=intro
const obj /*:object*/ = { expires: expires };
const tmpForInGen = $forIn(obj);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key = tmpForInNext.value;
    $(`key`, key);
  }
}
$(`done`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { expires: expires };
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    $( "key", e );
  }
}
$( "done" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

expires

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
