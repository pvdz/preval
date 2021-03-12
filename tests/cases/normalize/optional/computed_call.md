# Preval test case

# computed_call.md

> Normalize > Optional > Computed call
>
> Computed member sets context so should be kept

#TODO

## Input

`````js filename=intro
const a = {
  x: function(...args){ $(args, this.y); },
  y: 100,
};
$(a)[$('x')]?.(1, 2, 3);
`````

## Pre Normal

`````js filename=intro
const a = {
  x: function (...args) {
    $(args, this.y);
  },
  y: 100,
};
$(a)[$('x')]?.(1, 2, 3);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = function (...args) {
  const tmpPrevalAliasThis = this;
  const tmpCallCallee = $;
  const tmpCalleeParam = args;
  const tmpCalleeParam$1 = tmpPrevalAliasThis.y;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainRootComputed = $('x');
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall, 1, 2, 3);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = function (...args) {
  const tmpPrevalAliasThis = this;
  const tmpCalleeParam$1 = tmpPrevalAliasThis.y;
  $(args, tmpCalleeParam$1);
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainElementCall = $(a);
const tmpChainRootComputed = $('x');
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
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
 - 2: 'x'
 - 3: [1, 2, 3], 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
