# Preval test case

# catch_to_closure.md

> Static arg ops > Assignment > Catch to closure
>
>

## Input

`````js filename=intro
try {
  $();
} catch (e) {
  let a = $(1);
  const f = function() {
    a = e;
    $('filler');
    $('more filler');
    return
  }
  $(f(1, 2));
  $(f(3, 4));
  $(a);
}
`````

## Settled


`````js filename=intro
try {
  $();
} catch (e) {
  let a /*:unknown*/ = $(1);
  const f /*:()=>undefined*/ = function () {
    debugger;
    a = e;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  f();
  $(undefined);
  f();
  $(undefined);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $();
} catch (e) {
  let a = $(1);
  const f = function () {
    a = e;
    $(`filler`);
    $(`more filler`);
  };
  f();
  $(undefined);
  f();
  $(undefined);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
try {
  $();
} catch (e) {
  let a = $(1);
  const f = function () {
    debugger;
    a = e;
    $(`filler`);
    $(`more filler`);
    return;
  };
  $(f(1, 2));
  $(f(3, 4));
  $(a);
}
`````

## Normalized


`````js filename=intro
try {
  $();
} catch (e) {
  let a = $(1);
  const f = function () {
    debugger;
    a = e;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  const tmpCalleeParam = f(1, 2);
  $(tmpCalleeParam);
  const tmpCalleeParam$1 = f(3, 4);
  $(tmpCalleeParam$1);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
try {
  $();
}
catch (a) {
  let b = $( 1 );
  const c = function() {
    debugger;
    b = a;
    $( "filler" );
    $( "more filler" );
    return undefined;
  };
  c();
  $( undefined );
  c();
  $( undefined );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
