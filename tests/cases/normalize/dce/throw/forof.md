# Preval test case

# forof.md

> Normalize > Dce > Throw > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
    throw $(1, 'throw');
    $('fail');
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let tmpForOfGen = $forOf([10, 20]);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForOfNext = tmpForOfGen.next();
      if (tmpForOfNext.done) {
        break;
      } else {
        let x = tmpForOfNext.value;
        {
          throw $(1, `throw`);
          $(`fail`);
        }
      }
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $forOf;
  const tmpCalleeParam = [10, 20];
  let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      let x = tmpForOfNext.value;
      const tmpThrowArg = $(1, `throw`);
      throw tmpThrowArg;
    }
  }
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [10, 20];
const tmpForOfGen = $forOf(tmpCalleeParam);
const tmpForOfNext = tmpForOfGen.next();
const tmpIfTest = tmpForOfNext.done;
if (tmpIfTest) {
  $(undefined);
} else {
  tmpForOfNext.value;
  const tmpThrowArg = $(1, `throw`);
  throw tmpThrowArg;
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20 ];
const b = $forOf( a );
const c = b.next();
const d = c.done;
if (d) {
  $( undefined );
}
else {
  c.value;
  const e = $( 1, "throw" );
  throw e;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
