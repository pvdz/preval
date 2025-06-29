# Preval test case

# mutation_without_closure.md

> Object literal > Prop write > Mutation without closure
>
> Counter case to closures, this does the same just without the closure.
> Preval should recognize that x does not escape and ignore the func call.

## Input

`````js filename=intro
function f() { 
  $('a');
  //x.y = 5;
  $('b');
}
const x = {y: 0};
f();
x.y = 10;
f();
$(x);
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(`a`);
  $(`b`);
  return undefined;
};
f();
f();
const x /*:object*/ /*truthy*/ = { y: 10 };
$(x);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`a`);
  $(`b`);
};
f();
f();
$({ y: 10 });
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "a" );
  $( "b" );
  return undefined;
};
a();
a();
const b = { y: 10 };
$( b );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(`a`);
  $(`b`);
  return undefined;
};
const x = { y: 0 };
f();
x.y = 10;
f();
$(x);
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'a'
 - 4: 'b'
 - 5: { y: '10' }
 - 6: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
