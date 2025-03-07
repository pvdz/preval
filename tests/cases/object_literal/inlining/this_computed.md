# Preval test case

# this_computed.md

> Object literal > Inlining > This computed
>
>

## Input

`````js filename=intro
const obj = {f: function(){ $(this['f f']); }};
$(obj.f());
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis[`f f`];
  $(tmpCalleeParam);
  return undefined;
};
const obj /*:object*/ = { f: tmpObjLitVal };
const tmpCalleeParam$1 /*:unknown*/ = obj.f();
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis[`f f`]);
};
$({ f: tmpObjLitVal }.f());
`````

## Pre Normal


`````js filename=intro
const obj = {
  f: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(tmpPrevalAliasThis[`f f`]);
  },
};
$(obj.f());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpCalleeParam = tmpPrevalAliasThis[`f f`];
  $(tmpCalleeParam);
  return undefined;
};
const obj = { f: tmpObjLitVal };
const tmpCalleeParam$1 = obj.f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b[ "f f" ];
  $( c );
  return undefined;
};
const d = { f: a };
const e = d.f();
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
