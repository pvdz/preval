# Preval test case

# parseint.md

> Let aliases > Parseint
>
> When two const bindings are assigned the same value, they are an alias

## Input

`````js filename=intro
const n = $('1');
let the_let_binding = $(1);

function f() {
  the_let_binding = 2;
  f = function() {
    return the_let_binding
  };
  return f();
}

// a and b are clearly an alias
const a = the_let_binding;
const m = parseInt(n);
const mm = m / 33;
const the_let_alias_to_eliminate = a;
$(a, the_let_alias_to_eliminate);
$(f);
$(mm);
`````


## Settled


`````js filename=intro
let f /*:()=>unknown*/ = function () {
  debugger;
  the_let_binding = 2;
  f = function () {
    debugger;
    return the_let_binding;
  };
  const tmpReturnArg /*:unknown*/ = f();
  return tmpReturnArg;
};
const n /*:unknown*/ = $(`1`);
let the_let_binding /*:unknown*/ = $(1);
const a /*:unknown*/ = the_let_binding;
const m /*:number*/ = $Number_parseInt(n);
$(a, a);
$(f);
const mm /*:number*/ = m / 33;
$(mm);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let f = function () {
  the_let_binding = 2;
  f = function () {
    return the_let_binding;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
const n = $(`1`);
let the_let_binding = $(1);
const a = the_let_binding;
const m = $Number_parseInt(n);
$(a, a);
$(f);
$(m / 33);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  b = 2;
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = $( "1" );
let b = $( 1 );
const e = b;
const f = $Number_parseInt( d );
$( e, e );
$( a );
const g = f / 33;
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  the_let_binding = 2;
  f = function () {
    debugger;
    return the_let_binding;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
const n = $(`1`);
let the_let_binding = $(1);
const a = the_let_binding;
const m = $Number_parseInt(n);
const mm = m / 33;
const the_let_alias_to_eliminate = a;
$(a, a);
$(f);
$(mm);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1'
 - 2: 1
 - 3: 1, 1
 - 4: '<function>'
 - 5: 0.030303030303030304
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
