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
    const tmpPrevalAliasThis = this;
    let args = $$0;
    debugger;
    $(args, tmpPrevalAliasThis.y);
  },
  y: 100,
};
$(a).x?.(1, 2, 3);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = function (...$$0) {
  const tmpPrevalAliasThis = this;
  let args = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = args;
  const tmpCalleeParam$1 = tmpPrevalAliasThis.y;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  return undefined;
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainElementObject = tmpChainElementCall.x;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, 1, 2, 3);
} else {
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = function (...$$0) {
  const tmpPrevalAliasThis = this;
  const args = $$0;
  debugger;
  const tmpCalleeParam$1 = tmpPrevalAliasThis.y;
  $(args, tmpCalleeParam$1);
  return undefined;
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.x;
const tmpIfTest = tmpChainElementObject == null;
if (tmpIfTest) {
} else {
  $dotCall(tmpChainElementObject, tmpChainElementCall, 1, 2, 3);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  const c = d;
  debugger;
  const e = b.y;
  $( c, e );
  return undefined;
};
const f = {
x: a,
y: 100
;
const g = $( f );
const h = g.x;
const i = h == null;
if (i) {

}
else {
  $dotCall( h, g, 1, 2, 3 );
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
