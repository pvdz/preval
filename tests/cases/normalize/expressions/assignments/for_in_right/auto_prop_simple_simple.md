# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > For in right > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = { b: $(1) }));
a.b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn((a = { b: $(1) }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      let x = tmpForInNext.value;
    }
  }
}
a.b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $forIn;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam = a;
let tmpForInGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x = tmpForInNext.value;
  }
}
a.b = 2;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
const tmpForInGen = $forIn(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
  }
}
a.b = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
const c = $forIn( b );
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
b.b = 2;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
