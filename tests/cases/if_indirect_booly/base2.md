# Preval test case

# base2.md

> If indirect booly > Base2
>
> This is from an intermediate result of an obfuscation case where they store computation results as expandos on a function.
> The trick here is that `a === undefined` is really testing whether `a` is booly so `test` should get eliminated.

## Input

`````js filename=intro
const arr = ['a', 'b', 'c', 'd'];
let a/*:primitive*/ = undefined;
let b/*:unknown*/ = undefined;
let c/*:unknown*/ = undefined;
const func/*:(number, string)=>unknown*/ = function($$0, $$1) {
  const arg1/*:number*/ = $$0;
  const arg2/*:string*/ = $$1;
  debugger;
  const test/*:boolean*/ = a === undefined;
  if (test) {
    b = $;
    c = {};
    a = true;
  } else {

  }
  const v1/*:string*/ = arr[0];
  const c_prime/*:unknown*/ = c;
  const concatted/*:string*/ = arg1 + v1;
  const lookup/*:unknown*/ = c_prime[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real/*:unknown*/ = b(arg2);
    c[concatted] = real;
    return real;
  }
};
const x/*:unknown*/ = func(22);
const y/*:unknown*/ = func(12);
$(x, y);
`````


## Settled


`````js filename=intro
const c /*:object*/ /*truthy*/ = {};
const func /*:(string)=>unknown*/ = function ($$0) {
  const tmpOutlinedParam /*:string*/ = $$0;
  debugger;
  const lookup /*:unknown*/ = c[tmpOutlinedParam];
  if (lookup) {
    return lookup;
  } else {
    const real /*:unknown*/ = $(undefined);
    c[tmpOutlinedParam] = real;
    return real;
  }
};
const x /*:unknown*/ = func(`22a`);
const y /*:unknown*/ = func(`12a`);
$(x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = {};
const func = function (tmpOutlinedParam) {
  const lookup = c[tmpOutlinedParam];
  if (lookup) {
    return lookup;
  } else {
    const real = $(undefined);
    c[tmpOutlinedParam] = real;
    return real;
  }
};
$(func(`22a`), func(`12a`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = a[ c ];
  if (d) {
    return d;
  }
  else {
    const e = $( undefined );
    a[c] = e;
    return e;
  }
};
const f = b( "22a" );
const g = b( "12a" );
$( f, g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`];
let a = undefined;
let b = undefined;
let c = undefined;
const func = function ($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const arg1 = $dlr_$$0;
  const arg2 = $dlr_$$1;
  const test = a === undefined;
  if (test) {
    b = $;
    c = {};
    a = true;
  } else {
  }
  const v1 = arr[0];
  const c_prime = c;
  const concatted = arg1 + v1;
  const lookup = c_prime[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real = b(arg2);
    c[concatted] = real;
    return real;
  }
};
const x = func(22);
const y = func(12);
$(x, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
