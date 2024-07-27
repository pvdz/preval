# Preval test case

# var_body2.md

> Normalize > For > Forof > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
for(const n of [1,2,3]) var x = n;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
{
  let tmpForOfGen = $forOf([1, 2, 3]);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      const n = tmpForOfNext.value;
      x = n;
    }
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpCallCallee = $forOf;
const tmpCalleeParam = [1, 2, 3];
let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const n = tmpForOfNext.value;
    x = n;
  }
}
$(x);
`````

## Output


`````js filename=intro
let x = undefined;
const tmpCalleeParam = [1, 2, 3];
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const n = tmpForOfNext.value;
    x = n;
  }
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [ 1, 2, 3 ];
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    a = f;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
