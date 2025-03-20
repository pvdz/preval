# Preval test case

# returned_and_not_called.md

> Return param > Returned and not called
>
> Returning a static param mutation but also reading it so we can't just eliminate it

## Input

`````js filename=intro
function f(g) {
  $('a')
  $('b')
  $('c')
  let y = g(1);
  return y;
}
$(f(function(a){ $(a, 'first'); }));
$(f(function(a){ $(a, 'second'); }));
$(f(function(a){ $(a, 'third'); }));
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`a`);
  $(`b`);
  $(`c`);
  return undefined;
};
f();
$(1, `first`);
$(undefined);
f();
$(1, `second`);
$(undefined);
f();
$(1, `third`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`a`);
  $(`b`);
  $(`c`);
};
f();
$(1, `first`);
$(undefined);
f();
$(1, `second`);
$(undefined);
f();
$(1, `third`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "a" );
  $( "b" );
  $( "c" );
  return undefined;
};
a();
$( 1, "first" );
$( undefined );
a();
$( 1, "second" );
$( undefined );
a();
$( 1, "third" );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 1, 'first'
 - 5: undefined
 - 6: 'a'
 - 7: 'b'
 - 8: 'c'
 - 9: 1, 'second'
 - 10: undefined
 - 11: 'a'
 - 12: 'b'
 - 13: 'c'
 - 14: 1, 'third'
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
