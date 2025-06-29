# Preval test case

# noob_checks_has_member.md

> Const promotion > Noob checks has member
>
> A let decl with assignment later can be transformed if there are only statements in between with no observable side effects.

## Input

`````js filename=intro
let x = $(10);
var a = function(){ return x; }; // Closure, making trivial analysis harder
var b = {
  set x(n) { x = $(30, 'from set'); },
  get x() { return $(40, 'from get'); }
};
a = 2;
b.x = x;
x = $(20);
$(x, a, b, 'final');
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(10);
const b /*:object*/ /*truthy*/ = {
  set x($$0) {
    debugger;
    x = $(30, `from set`);
    return undefined;
  },
  get x() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(40, `from get`);
    return tmpReturnArg;
  },
};
b.x = x;
x = $(20);
$(x, 2, b, `final`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(10);
const b = {
  set x($$0) {
    x = $(30, `from set`);
  },
  get x() {
    const tmpReturnArg = $(40, `from get`);
    return tmpReturnArg;
  },
};
b.x = x;
x = $(20);
$(x, 2, b, `final`);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 10 );
const b = {
  set x( $$0 ) {
    debugger;
    a = $( 30, "from set" );
    return undefined;
  },
  get x() {
    debugger;
    const c = $( 40, "from get" );
    return c;
  },
};
b.x = a;
a = $( 20 );
$( a, 2, b, "final" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let x = $(10);
a = function () {
  debugger;
  return x;
};
b = {
  set x($$0) {
    let n = $$0;
    debugger;
    x = $(30, `from set`);
    return undefined;
  },
  get x() {
    debugger;
    const tmpReturnArg = $(40, `from get`);
    return tmpReturnArg;
  },
};
a = 2;
b.x = x;
x = $(20);
$(x, a, b, `final`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 30, 'from set'
 - 3: 20
 - 4: 20, 2, { x: '<get/set>' }, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
