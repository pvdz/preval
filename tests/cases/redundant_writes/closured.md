# Preval test case

# closured.md

> Redundant writes > Closured
>
> We can observe the initial local binding when it is a closure that can still access the binding afterwards.
> The second write would not complete and we could observe the initial value this way.

## Input

`````js filename=intro
let f;
try {
  let n = 1;
  f = function(){ return n; };
  if ($(true)) {
    n = $('throws 2');
  } else {
    n = $('throws 3');
  }
} catch {

}
$(f());
`````


## Settled


`````js filename=intro
let f /*:unknown*/ = undefined;
let n /*:unknown*/ = 1;
try {
  f = function () {
    debugger;
    return n;
  };
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let f = undefined;
let n = 1;
try {
  f = function () {
    return n;
  };
  if ($(true)) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = 1;
try {
  a = function() {
    debugger;
    return b;
  };
  const c = $( true );
  if (c) {
    b = $( "throws 2" );
  }
  else {
    b = $( "throws 3" );
  }
}
catch (d) {

}
const e = a();
$( e );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal
- (todo) can try-escaping support this expr node type? FunctionExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'throws 2'
 - 3: 'throws 2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
