# Preval test case

# implicit.md

> Return > Implicit
>
> After normalization it's no longer implicit

## Input

`````js filename=intro
function f() {
  if ($) {
    $(100);
  }
}
$(f());
$(f());
$(f());
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  if ($) {
    $(100);
    return undefined;
  } else {
    return undefined;
  }
};
f();
$(undefined);
f();
$(undefined);
f();
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($) {
    $(100);
  }
};
f();
$(undefined);
f();
$(undefined);
f();
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(100);
  }
};
$(f());
$(f());
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(100);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    $( 100 );
    return undefined;
  }
  else {
    return undefined;
  }
};
a();
$( undefined );
a();
$( undefined );
a();
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: 100
 - 4: undefined
 - 5: 100
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
