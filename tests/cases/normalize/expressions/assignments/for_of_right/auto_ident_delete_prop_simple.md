# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = delete arg.y));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf((a = delete arg.y));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x = tmpForOfNext.value;
    }
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $forOf;
a = delete arg.y;
let tmpCalleeParam = a;
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
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = delete arg.y;
const tmpForOfGen = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    d.value;
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
