# Preval test case

# computed_call.md

> Normalize > Optional > Computed call
>
> Computed member sets context so should be kept

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
  x: function (...$$0) {
    const tmpPrevalAliasThis = this;
    let args = $$0;
    debugger;
    $(args, tmpPrevalAliasThis.y);
  },
  y: 100,
};
$(a)[$(`x`)]?.(1, 2, 3);
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
const tmpChainRootComputed = $(`x`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, 1, 2, 3);
} else {
}
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:(unknown)=>undefined*/ = function (...$$0) {
  const tmpPrevalAliasThis /*:object*/ = this;
  const args = $$0;
  debugger;
  const tmpCalleeParam$1 = tmpPrevalAliasThis.y;
  $(args, tmpCalleeParam$1);
  return undefined;
};
const a /*:object*/ = { x: tmpObjLitVal, y: 100 };
const tmpChainElementCall = $(a);
const tmpChainRootComputed = $(`x`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
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
  y: 100,
};
const g = $( f );
const h = $( "x" );
const i = g[ h ];
const j = i == null;
if (j) {

}
else {
  $dotCall( i, g, 1, 2, 3 );
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
