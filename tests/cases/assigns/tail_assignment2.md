# Preval test case

# tail_assignment2.md

> Assigns > Tail assignment2
>
> An assignment at the end of a function may be dead code

## Input

`````js filename=intro
function f() {
  let x = $(1);
  $(x, 'middle');
  x = $(x, 'observable rhs'); // main point is getting rid of this assignment, safely
  return $('end');
}
$(f());
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const x /*:unknown*/ = $(1);
  $(x, `middle`);
  $(x, `observable rhs`);
  const tmpReturnArg /*:unknown*/ = $(`end`);
  return tmpReturnArg;
};
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = f();
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const x = $(1);
  $(x, `middle`);
  $(x, `observable rhs`);
  const tmpReturnArg = $(`end`);
  return tmpReturnArg;
};
$(f());
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( b, "middle" );
  $( b, "observable rhs" );
  const c = $( "end" );
  return c;
};
const d = a();
$( d );
const e = a();
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 'middle'
 - 3: 1, 'observable rhs'
 - 4: 'end'
 - 5: 'end'
 - 6: 1
 - 7: 1, 'middle'
 - 8: 1, 'observable rhs'
 - 9: 'end'
 - 10: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
