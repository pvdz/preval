# Preval test case

# prop_call.md

> Normalize > Optional > Prop call
>
> Computed member sets context so should be kept

#TODO

## Input

`````js filename=intro
const a = {
  x: function(...args){ $(args, this.y); },
  y: 100,
};
$(a).x?.(1, 2, 3);
`````

## Pre Normal

`````js filename=intro
const a = {
  x: function (...$$0) {
    const tmpthis = this;
    let args = $$0;
    debugger;
    $(args, tmpthis.y);
  },
  y: 100,
};
$(a).x?.(1, 2, 3);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = function (...$$0) {
  const tmpthis = this;
  let args = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = args;
  const tmpCalleeParam$1 = tmpthis.y;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  return undefined;
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainElementObject = tmpChainElementCall.x;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall, 1, 2, 3);
} else {
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = function (...$$0) {
  const tmpthis = this;
  const args = $$0;
  debugger;
  const tmpCalleeParam$1 = tmpthis.y;
  $(args, tmpCalleeParam$1);
  return undefined;
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.x;
const tmpIfTest = tmpChainElementObject == null;
if (tmpIfTest) {
} else {
  tmpChainElementObject.call(tmpChainElementCall, 1, 2, 3);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '"<function>"', y: '100' }
 - 2: [1, 2, 3], 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
