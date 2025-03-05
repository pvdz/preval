# Preval test case

# var_body2.md

> Normalize > For > Forin > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
for(const n in {a: 1, b: 2}) var x = n;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
{
  let tmpForInGen = $forIn({ a: 1, b: 2 });
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      const n = tmpForInNext.value;
      x = n;
    }
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpCalleeParam = { a: 1, b: 2 };
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const n = tmpForInNext.value;
    x = n;
  }
}
$(x);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = undefined;
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const n /*:unknown*/ = tmpForInNext.value;
    x = n;
  }
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 1,
  b: 2,
};
const c = $forIn( b );
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
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
