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

## Normalized

`````js filename=intro
const tmpObjLitVal = function (...args) {
  const tmpPrevalThisAlias = this;
  const tmpCallCallee = $;
  const tmpCalleeParam = args;
  const tmpCompObj = tmpPrevalThisAlias;
  const tmpCalleeParam$1 = tmpCompObj.y;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainElementObject = tmpChainElementCall.x;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall, 1, 2, 3);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = function (...args) {
  const tmpPrevalThisAlias = this;
  const tmpCalleeParam$1 = tmpPrevalThisAlias.y;
  $(args, tmpCalleeParam$1);
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.x;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
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

Normalized calls: Same

Final output calls: Same
