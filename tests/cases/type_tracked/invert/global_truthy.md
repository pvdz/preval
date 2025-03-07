# Preval test case

# global_truthy.md

> Type tracked > Invert > Global truthy
>
> Inverting a value that we know is a falsy value must return true

## Input

`````js filename=intro
function f() {
  if ($) {
    $(!$, 'fail');
  } else {
    $(!$, 'pass');
  }
}
f();
f();
f();
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const tmpCalleeParam /*:boolean*/ = !$;
  if ($) {
    $(tmpCalleeParam, `fail`);
    return undefined;
  } else {
    $(tmpCalleeParam, `pass`);
    return undefined;
  }
};
f();
f();
f();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpCalleeParam = !$;
  if ($) {
    $(tmpCalleeParam, `fail`);
  } else {
    $(tmpCalleeParam, `pass`);
  }
};
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(!$, `fail`);
  } else {
    $(!$, `pass`);
  }
};
f();
f();
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    const tmpCalleeParam = !$;
    $(tmpCalleeParam, `fail`);
    return undefined;
  } else {
    const tmpCalleeParam$1 = !$;
    $(tmpCalleeParam$1, `pass`);
    return undefined;
  }
};
f();
f();
f();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = !$;
  if ($) {
    $( b, "fail" );
    return undefined;
  }
  else {
    $( b, "pass" );
    return undefined;
  }
};
a();
a();
a();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false, 'fail'
 - 2: false, 'fail'
 - 3: false, 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
