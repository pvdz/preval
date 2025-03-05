# Preval test case

# for-header-ident-rhs-scoping.md

> Normalize > Binding > For-header-ident-rhs-scoping
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

This should crash during eval

## Input

`````js filename=intro
let x = 1;
let y = 1;
for (let x in [x]) {
  let y = 2;
  $(x);
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
      let x$1 = tmpForInNext.value;
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
    let x$2 = tmpForInNext.value;
    let y$1 = 2;
    $(x$2);
  }
}
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [x$1];
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x$2 /*:unknown*/ = tmpForInNext.value;
    $(x$2);
  }
}
`````

## PST Output

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
    $( e );
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not defined ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')
