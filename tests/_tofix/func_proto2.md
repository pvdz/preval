# Preval test case

# func_proto2.md

> Tofix > func proto2
>
> We know it gets the proto from a function tho. Same for array regex etc?

## Input

`````js filename=intro
const g = function($$0, e$763, r$635) {
  const f = function(t$987, e$767) {
    const tmpPrevalAliasThis$241/*:object*/ = this;
    tmpPrevalAliasThis$241._pairs = [];
    if (t$987) {
      const tmpCallComplexCallee$25 = Object(i$441.a);
      tmpCallComplexCallee$25(t$987, tmpPrevalAliasThis$241, e$767);
    }
  };
  const i$441 = $(`e467`);
  const o$233 = f.prototype;
  $(o$233);
};
$(g);
`````

## Settled


`````js filename=intro
const g /*:(unused, unused, unused)=>undefined*/ = function ($$0, $$1, $$2) {
  debugger;
  const f /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
    const tmpPrevalAliasThis /*:object*/ = this;
    const t$987 /*:unknown*/ = $$0;
    const e$767 /*:unknown*/ = $$1;
    debugger;
    const tmpAssignMemRhs /*:array*/ = [];
    tmpPrevalAliasThis._pairs = tmpAssignMemRhs;
    if (t$987) {
      const tmpCalleeParam /*:unknown*/ = i$441.a;
      const tmpCallComplexCallee$25 /*:unknown*/ = Object(tmpCalleeParam);
      tmpCallComplexCallee$25(t$987, tmpPrevalAliasThis, e$767);
      return undefined;
    } else {
      return undefined;
    }
  };
  const i$441 /*:unknown*/ = $(`e467`);
  const o$233 /*:unknown*/ = f.prototype;
  $(o$233);
  return undefined;
};
$(g);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function ($$0, $$1, $$2) {
  const f = function (t$987, e$767) {
    const tmpPrevalAliasThis = this;
    tmpPrevalAliasThis._pairs = [];
    if (t$987) {
      const tmpCallComplexCallee$25 = Object(i$441.a);
      tmpCallComplexCallee$25(t$987, tmpPrevalAliasThis, e$767);
    }
  };
  const i$441 = $(`e467`);
  $(f.prototype);
});
`````

## Pre Normal


`````js filename=intro
const g = function ($$0, $$1, $$2) {
  let $dlr_$$0 = $$0;
  let e$763 = $$1;
  let r$635 = $$2;
  debugger;
  const f = function ($$0, $$1) {
    const tmpPrevalAliasThis = this;
    let t$987 = $$0;
    let e$767 = $$1;
    debugger;
    const tmpPrevalAliasThis$241 = tmpPrevalAliasThis;
    tmpPrevalAliasThis$241._pairs = [];
    if (t$987) {
      const tmpCallComplexCallee$25 = Object(i$441.a);
      tmpCallComplexCallee$25(t$987, tmpPrevalAliasThis$241, e$767);
    }
  };
  const i$441 = $(`e467`);
  const o$233 = f.prototype;
  $(o$233);
};
$(g);
`````

## Normalized


`````js filename=intro
const g = function ($$0, $$1, $$2) {
  let $dlr_$$0 = $$0;
  let e$763 = $$1;
  let r$635 = $$2;
  debugger;
  const f = function ($$0, $$1) {
    const tmpPrevalAliasThis = this;
    let t$987 = $$0;
    let e$767 = $$1;
    debugger;
    const tmpPrevalAliasThis$241 = tmpPrevalAliasThis;
    const tmpAssignMemLhsObj = tmpPrevalAliasThis$241;
    const tmpAssignMemRhs = [];
    tmpAssignMemLhsObj._pairs = tmpAssignMemRhs;
    if (t$987) {
      const tmpCalleeParam = i$441.a;
      const tmpCallComplexCallee$25 = Object(tmpCalleeParam);
      tmpCallComplexCallee$25(t$987, tmpPrevalAliasThis$241, e$767);
      return undefined;
    } else {
      return undefined;
    }
  };
  const i$441 = $(`e467`);
  const o$233 = f.prototype;
  $(o$233);
  return undefined;
};
$(g);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  debugger;
  const b = function($$0,$$1 ) {
    const c = this;
    const d = $$0;
    const e = $$1;
    debugger;
    const f = [];
    c._pairs = f;
    if (d) {
      const g = h.a;
      const i = Object( g );
      i( d, c, e );
      return undefined;
    }
    else {
      return undefined;
    }
  };
  const h = $( "e467" );
  const j = b.prototype;
  $( j );
  return undefined;
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
