# Preval test case

# for-header-pattern-rhs-scoping-ok.md

> Normalize > Binding > For-header-pattern-rhs-scoping-ok
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

## Input

`````js filename=intro
let x = 1;
let y = {};
for (let [x] in [y]) {
  let y = 2;
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let y = {};
{
  let tmpForInGen = $forIn([y]);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      let [x$1] = tmpForInNext.value;
      {
        let y$1 = 2;
        $(x$1);
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
let x = 1;
let y = {};
const tmpCalleeParam = [y];
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let bindingPatternArrRoot = tmpForInNext.value;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x$1 = arrPatternSplat[0];
    let y$1 = 2;
    $(x$1);
  }
}
`````

## Output


`````js filename=intro
const y /*:object*/ = {};
const tmpCalleeParam /*:array*/ = [y];
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const bindingPatternArrRoot /*:unknown*/ = tmpForInNext.value;
    const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
    const x$1 /*:unknown*/ = arrPatternSplat[0];
    $(x$1);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = [ a ];
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
    const h = g[ 0 ];
    $( h );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
