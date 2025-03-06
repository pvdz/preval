# Preval test case

# reg_seq_simple_computed_complex1.md

> Normalize > Expressions > Assignments > For of right > Reg seq simple computed complex1
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
for (let x of $([]));
`````

## Pre Normal


`````js filename=intro
{
  let tmpForOfGen = $forOf($([]));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x = tmpForOfNext.value;
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = [];
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x = tmpForOfNext.value;
  }
}
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = $( a );
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
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next