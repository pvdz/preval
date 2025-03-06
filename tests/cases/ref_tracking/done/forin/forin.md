# Preval test case

# forin.md

> Ref tracking > Done > Forin > Forin
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
for (let x in {a:10, b:20}) {
  $('fail');
}
$('keep, do not eval');
`````

## Pre Normal


`````js filename=intro
{
  let tmpForInGen = $forIn({ a: 10, b: 20 });
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      let x = tmpForInNext.value;
      {
        $(`fail`);
      }
    }
  }
}
$(`keep, do not eval`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = { a: 10, b: 20 };
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x = tmpForInNext.value;
    $(`fail`);
  }
}
$(`keep, do not eval`);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 10, b: 20 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
    $(`fail`);
  }
}
$(`keep, do not eval`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 10,
  b: 20,
};
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
    $( "fail" );
  }
}
$( "keep, do not eval" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'fail'
 - 2: 'fail'
 - 3: 'keep, do not eval'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next