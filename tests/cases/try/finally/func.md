# Preval test case

# func.md

> Try > Finally > Func
>
> Finally transform checks

## Input

`````js filename=intro
try {
  $(1);
  const f = function() {
    throw 'test';
  }
  $(f);
} finally {
  $(2);
}
`````

## Settled


`````js filename=intro
try {
  $(1);
  const f /*:()=>unknown*/ = function () {
    debugger;
    throw `test`;
  };
  $(f);
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
  $(function () {
    throw `test`;
  });
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
`````

## Pre Normal


`````js filename=intro
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $(1);
      const f = function () {
        debugger;
        throw `test`;
      };
      $(f);
    } catch ($finalImplicit) {
      $(2);
      throw $finalImplicit;
    }
  }
  {
    $(2);
  }
  if ($implicitThrow) throw $finalCatchArg;
  else {
  }
}
`````

## Normalized


`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
  const f = function () {
    debugger;
    throw `test`;
  };
  $(f);
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
  const a = function() {
    debugger;
    throw "test";
  };
  $( a );
}
catch (b) {
  $( 2 );
  throw b;
}
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: '<function>'
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
