# Preval test case

# var_pattern_for_of_global_block.md

> Normalize > Hoisting > Base > Var pattern for of global block
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
$(x);
{
  for (var [x] of [[100]]) $(x, 'for');
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(x);
{
  {
    let tmpForOfGen = $forOf([[100]]);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForOfNext = tmpForOfGen.next();
      if (tmpForOfNext.done) {
        break;
      } else {
        [x] = tmpForOfNext.value;
        $(x, `for`);
      }
    }
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
$(x);
const tmpArrElement = [100];
const tmpCalleeParam = [tmpArrElement];
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const arrAssignPatternRhs = tmpForOfNext.value;
    const arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    $(x, `for`);
  }
}
$(x);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = undefined;
$(undefined);
const tmpArrElement /*:array*/ = [100];
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const arrAssignPatternRhs /*:unknown*/ = tmpForOfNext.value;
    const arrPatternSplat /*:array*/ = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    $(x, `for`);
  }
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$( undefined );
const b = [ 100 ];
const c = [ b ];
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = e.value;
    const h = [ ...g ];
    a = h[ 0 ];
    $( a, "for" );
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
