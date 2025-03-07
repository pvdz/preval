# Preval test case

# truthy_arg.md

> Tofix > truthy arg
>
> When the func is called with a non-zero number in all cases then inside of it the `if` can be eliminated safely

## Input

`````js filename=intro
const f = function(x) {
  let y = x;
  const obj = { xyz: x };
  if (x) {
    $(x, obj);
  } else {
  
  }
  $('end');
}
f(1);
f(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  if (x) {
    $(x, { xyz: x });
  }
  $(`end`);
};
f(1);
f(2);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  let y = x;
  const obj = { xyz: x };
  if (x) {
    $(x, obj);
  } else {
  }
  $(`end`);
};
f(1);
f(2);
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  let y = x;
  const obj = { xyz: x };
  if (x) {
    $(x, obj);
  } else {
  }
  $(`end`);
  return undefined;
};
f(1);
f(2);
`````

## Settled


`````js filename=intro
const f /*:(number)=>undefined*/ = function ($$0) {
  const x /*:number*/ = $$0;
  debugger;
  if (x) {
    const obj /*:object*/ = { xyz: x };
    $(x, obj);
  } else {
  }
  $(`end`);
  return undefined;
};
f(1);
f(2);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  if (b) {
    const c = { xyz: b };
    $( b, c );
  }
  $( "end" );
  return undefined;
};
a( 1 );
a( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { xyz: '1' }
 - 2: 'end'
 - 3: 2, { xyz: '2' }
 - 4: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
