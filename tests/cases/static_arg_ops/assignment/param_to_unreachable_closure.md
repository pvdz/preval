# Preval test case

# param_to_unreachable_closure.md

> Static arg ops > Assignment > Param to unreachable closure
>
>

## Input

`````js filename=intro
let f; { 
  let b = $(); 
  f = function(a) {
    b = a;
    $(a);
    $(b);
  }
}
f(1);
f(2);
`````


## Settled


`````js filename=intro
$();
let b /*:number*/ = 1;
const f /*:(number)=>undefined*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  $(a);
  $(b);
  return undefined;
};
f(1);
b = 2;
f(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
let b = 1;
const f = function (a) {
  $(a);
  $(b);
};
f(1);
b = 2;
f(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$();
let a = 1;
const b = function($$0 ) {
  const c = $$0;
  debugger;
  $( c );
  $( a );
  return undefined;
};
b( 1 );
a = 2;
b( 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
