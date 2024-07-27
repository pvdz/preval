# Preval test case

# for-header-pattern-rhs-scoping-tdz2.md

> Normalize > Binding > For-header-pattern-rhs-scoping-tdz2
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

This should crash during eval.

Constant inlining is causing `firstElement` to be inlined by `undefined` and then dropped, preventing the TDZ.

This may be an acceptable limitation. We can prevent this specific case but if the read is conditional then the optimization is correct. Considering a TDZ error is arguably a bug in the code and a guaranteed crash at runtime, ignoring that during compilation here should be ok.

We can skirt this particular case by detecting that the prior read was in the same scope. And since we've eliminated the only case where this may break (default switch cases that are not last), we should be able to safely assume that this would lead to a TDZ error if actually invoked. We just can't always know whether it will be invoked.

## Input

`````js filename=intro
const rhs = [firstElement];
let lhs = undefined;
let firstElement = undefined;
for (lhs in rhs) {
  const pattern = lhs;
  const patternSplat = [...pattern];
  let firstElementSSA = patternSplat[0];
  $(firstElementSSA);
}
`````

## Pre Normal


`````js filename=intro
const rhs = [$throwTDZError(`Preval: TDZ triggered for this read: [firstElement]`)];
let lhs = undefined;
let firstElement = undefined;
{
  let tmpForInGen = $forIn(rhs);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      lhs = tmpForInNext.value;
      {
        const pattern = lhs;
        const patternSplat = [...pattern];
        let firstElementSSA = patternSplat[0];
        $(firstElementSSA);
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
throw `Preval: TDZ triggered for this read: [firstElement]`;
const rhs = 0;
let lhs = 0;
let firstElement = 0;
`````

## Output


`````js filename=intro
throw `Preval: TDZ triggered for this read: [firstElement]`;
`````

## PST Output

With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: [firstElement]";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
