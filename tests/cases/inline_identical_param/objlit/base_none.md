# Preval test case

# base_none.md

> Inline identical param > Objlit > Base none
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj);
  $(obj);
}

f({});
f({});
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const obj /*:object*/ = {};
  $(obj);
  $(obj);
  return undefined;
};
f();
f();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const obj = {};
  $(obj);
  $(obj);
};
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj);
  $(obj);
};
f({});
f({});
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj);
  $(obj);
  return undefined;
};
const tmpCallCallee = f;
const tmpCalleeParam = {};
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = {};
tmpCallCallee$1(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = {};
  $( b );
  $( b );
  return undefined;
};
a();
a();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: {}
 - 3: {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
