# Preval test case

# var_pattern_for_in_global_block.md

> Normalize > Hoisting > Base > Var pattern for in global block
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
$(x);
{
  for (var [x] in {y: 100}) $(x, 'for');
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(x);
{
  {
    let tmpForInGen = $forIn({ y: 100 });
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForInNext = tmpForInGen.next();
      if (tmpForInNext.done) {
        break;
      } else {
        [x] = tmpForInNext.value;
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
const tmpCalleeParam = { y: 100 };
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const arrAssignPatternRhs = tmpForInNext.value;
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
const tmpCalleeParam /*:object*/ = { y: 100 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const arrAssignPatternRhs /*:unknown*/ = tmpForInNext.value;
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
const b = { y: 100 };
const c = $forIn( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    const g = [ ...f ];
    a = g[ 0 ];
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
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next