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
  x: function (...$$0 /*:array*/) {
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
const tmpObjLitVal = function (...$$0 /*:array*/) {
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
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, 1, 2, 3);
} else {
}
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const tmpPrevalAliasThis /*:object*/ = this;
  const args /*:array*/ = $$0;
  debugger;
  const tmpCalleeParam$1 /*:unknown*/ = tmpPrevalAliasThis.y;
  $(args, tmpCalleeParam$1);
  return undefined;
};
const a /*:object*/ = { x: tmpObjLitVal, y: 100 };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpChainRootComputed /*:unknown*/ = $(`x`);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
} else {
  $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, 1, 2, 3);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  const c = $$0;
  debugger;
  const d = b.y;
  $( c, d );
  return undefined;
};
const e = {
  x: a,
  y: 100,
};
const f = $( e );
const g = $( "x" );
const h = f[ g ];
const i = h == null;
if (i) {

}
else {
  $dotCall( h, f, undefined, 1, 2, 3 );
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
