# Preval test case

# hoisting_regression3.md

> Function > Hoisting regression3
>
> huh

## Input

`````js filename=intro
$(() => {
  if ($) {
    return;
  }
  let wheredoyougoto = $()
  function incorrectlyhoisted() {
    let C = $({});
    C["innerHTML"] = wheredoyougoto;
  }
  return incorrectlyhoisted
});
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:()=>unknown*/ = function () {
  debugger;
  const incorrectlyhoisted$3 /*:()=>undefined*/ = function () {
    debugger;
    const tmpCalleeParam$1 /*:object*/ = {};
    const C /*:unknown*/ = $(tmpCalleeParam$1);
    C.innerHTML = wheredoyougoto;
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
  }
  const wheredoyougoto /*:unknown*/ = $();
  return incorrectlyhoisted$3;
};
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  const incorrectlyhoisted$3 = function () {
    const C = $({});
    C.innerHTML = wheredoyougoto;
  };
  if ($) {
    return undefined;
  }
  const wheredoyougoto = $();
  return incorrectlyhoisted$3;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = function() {
    debugger;
    const c = {};
    const d = $( c );
    d.innerHTML = e;
    return undefined;
  };
  if ($) {
    return undefined;
  }
  const e = $();
  return b;
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
