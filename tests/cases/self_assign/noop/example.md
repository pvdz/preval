# Preval test case

# example.md

> Self assign > Noop > Example
>
> This case creates an inner function but no closures

## Input

`````js filename=intro
// SHOULD inline becasue f is not aliased.
const arr = [`2175510YjCZON`, `10TAFtVj`, `11526394DNqxUn`, `60YWJuYY`, `794766IkrVMo`, `348105xrUwtS`];
let f = function(a, b) {
  f = function(c, d) {
    const tmp = c - 427;
    const Co$1 = arr[tmp];
    return Co$1;
  };
  const tmpReturnArg$23 = f(a, b);
  return tmpReturnArg$23;
};
$(f(430));
$(f(431));
$(f(432));
$(f); // escapes (important, otherwise different rules would tackle it)
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [`2175510YjCZON`, `10TAFtVj`, `11526394DNqxUn`, `60YWJuYY`, `794766IkrVMo`, `348105xrUwtS`];
const f /*:(unknown)=>primitive*/ = function ($$0) {
  const c /*:unknown*/ = $$0;
  debugger;
  const tmp /*:number*/ = c - 427;
  const Co$1 /*:primitive*/ = arr[tmp];
  return Co$1;
};
const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = f(430);
$(tmpClusterSSA_tmpCalleeParam);
const tmpCalleeParam$1 /*:primitive*/ = f(431);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:primitive*/ = f(432);
$(tmpCalleeParam$3);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`2175510YjCZON`, `10TAFtVj`, `11526394DNqxUn`, `60YWJuYY`, `794766IkrVMo`, `348105xrUwtS`];
const f = function (c) {
  const tmp = c - 427;
  const Co$1 = arr[tmp];
  return Co$1;
};
$(f(430));
$(f(431));
$(f(432));
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "2175510YjCZON", "10TAFtVj", "11526394DNqxUn", "60YWJuYY", "794766IkrVMo", "348105xrUwtS" ];
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = c - 427;
  const e = a[ d ];
  return e;
};
const f = b( 430 );
$( f );
const g = b( 431 );
$( g );
const h = b( 432 );
$( h );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`2175510YjCZON`, `10TAFtVj`, `11526394DNqxUn`, `60YWJuYY`, `794766IkrVMo`, `348105xrUwtS`];
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  f = function ($$0, $$1) {
    let c = $$0;
    let d = $$1;
    debugger;
    const tmp = c - 427;
    const Co$1 = arr[tmp];
    return Co$1;
  };
  const tmpReturnArg$23 = f(a, b);
  return tmpReturnArg$23;
};
let tmpCalleeParam = f(430);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f(431);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f(432);
$(tmpCalleeParam$3);
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '60YWJuYY'
 - 2: '794766IkrVMo'
 - 3: '348105xrUwtS'
 - 4: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
