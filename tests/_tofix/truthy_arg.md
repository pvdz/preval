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


## Settled


`````js filename=intro
const f_t /*:(number)=>undefined*/ = function ($$0) {
  const x /*:number*/ = $$0;
  debugger;
  const obj /*:object*/ = { xyz: x };
  $(x, obj);
  $(`end`);
  return undefined;
};
f_t(1);
f_t(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f_t = function (x) {
  $(x, { xyz: x });
  $(`end`);
};
f_t(1);
f_t(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = { xyz: b };
  $( b, c );
  $( "end" );
  return undefined;
};
a( 1 );
a( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  let y = x;
  const obj = { xyz: x };
  if (x) {
    $(x, obj);
    $(`end`);
    return undefined;
  } else {
    $(`end`);
    return undefined;
  }
};
f(1);
f(2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


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
