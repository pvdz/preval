# Preval test case

# tail_assignment.md

> Assigns > Tail assignment
>
> An assignment at the end of a function may be dead code

## Input

`````js filename=intro
function f() {
  let x = $(1);
  function g(){ 
    $(x);
  }
  g();
  x = 10; // main point is getting rid of this one
}
$(f());
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const x /*:unknown*/ = $(1);
  $(x);
  return undefined;
};
f();
$(undefined);
f();
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $($(1));
};
f();
$(undefined);
f();
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( b );
  return undefined;
};
a();
$( undefined );
a();
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
