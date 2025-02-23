# Preval test case

# for_in_of_regression.md

> Ssa > Single scope > For in of regression
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
for (arr of list) {
  x = arr;
  $(x, `for`);
}
$(x);
`````

## Pre Normal


`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
{
  let tmpForOfGen = $forOf(list);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      arr = tmpForOfNext.value;
      {
        x = arr;
        $(x, `for`);
      }
    }
  }
}
$(x);
`````

## Normalized


`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
let tmpForOfGen = $forOf(list);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    arr = tmpForOfNext.value;
    x = arr;
    $(x, `for`);
  }
}
$(x);
`````

## Output


`````js filename=intro
$(undefined);
let x /*:unknown*/ = undefined;
const list /*:array*/ = [100];
const tmpForOfGen /*:unknown*/ = $forOf(list);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpClusterSSA_arr /*:unknown*/ = tmpForOfNext.value;
    x = tmpClusterSSA_arr;
    $(tmpClusterSSA_arr, `for`);
  }
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
let a = undefined;
const b = [ 100 ];
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
    $( f, "for" );
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
