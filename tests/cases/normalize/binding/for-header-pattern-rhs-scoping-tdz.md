# Preval test case

# for-header-pattern-rhs-scoping-tdz.md

> Normalize > Binding > For-header-pattern-rhs-scoping-tdz
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

This should crash during eval

## Input

`````js filename=intro
let x = 1;
let y = 1;
for (let [x] in [x]) {
  let y = 2;
  $(x);
}
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [x$1];
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const bindingPatternArrRoot /*:unknown*/ = tmpForInNext.value;
    const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
    const x$2 /*:unknown*/ = arrPatternSplat[0];
    $(x$2);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn([x$1]);
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const bindingPatternArrRoot = tmpForInNext.value;
    $([...bindingPatternArrRoot][0]);
  }
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let y = 1;
{
  let tmpForInGen = $forIn([x$1]);
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
let y = 1;
const tmpCalleeParam = [x$1];
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let bindingPatternArrRoot = tmpForInNext.value;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x$2 = arrPatternSplat[0];
    let y$1 = 2;
    $(x$2);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ x$1 ];
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    const f = [ ...e ];
    const g = f[ 0 ];
    $( g );
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not defined ]>')

Post settled calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
