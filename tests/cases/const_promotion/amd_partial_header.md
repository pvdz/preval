# Preval test case

# amd_partial_header.md

> Const promotion > Amd partial header
>
> Or what's left of it after partial evaluation.

/*
  // Need to be able to configure this as globals somehow
  // Temp
  ['window', 'undefined'],
  ['self', 'undefined'],
  ['module', 'undefined'],
  ['exports', 'undefined'],
  ['require', 'undefined'],
  ['define', 'undefined'],
  ['global', 'object'],
*/

## Input

`````js filename=intro
const g = function () {
  let test1 = false;
  const h = function () {
    if (test1) {
      const p1 = [];
      define(p1, $);
      return undefined;
    } else {
      const result = mainCall();
      global.React = result;
      return undefined;
    }
  };
  if (test1) {
    test1 = define.amd;
    h();
    return undefined;
  } else {
    h();
    return undefined;
  }
};
let test2 = false;
const f = function () {
  if (test2) {
    const result = mainCall();
    module.exports = result;
    return undefined;
  } else {
    g();
    return undefined;
  }
};
if (test2) {
  test2 = false;
  f();
} else {
  f();
}
`````


## Settled


`````js filename=intro
const result /*:unknown*/ = mainCall();
global.React = result;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
global.React = mainCall();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = mainCall();
global.React = a;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

mainCall


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
