# Preval test case

# unshift_broken.md

> Array > Manipulation > Unshift > Unshift broken
>
> Array literal with unshift and a const function binding in between

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
  $(ARR);
};
const NOOP2 = function() {
  $(ARR);
};
const x = function() {
  $('ok', ARR);
};
const count = ARR.unshift(x);
$(count);
ARR.push(count);
NOOP();
NOOP2();
$(NOOP, NOOP2);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ /*truthy*/ = [`a`, `b`, `c`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
const NOOP2 /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
const x /*:()=>unknown*/ = function () {
  debugger;
  $(`ok`, ARR);
  return undefined;
};
$dotCall($array_unshift, ARR, `unshift`, x);
$(4);
$dotCall($array_push, ARR, `push`, 4);
$(ARR);
$(ARR);
$(NOOP, NOOP2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  $(ARR);
};
const NOOP2 = function () {
  $(ARR);
};
$dotCall($array_unshift, ARR, `unshift`, function () {
  $(`ok`, ARR);
});
$(4);
$dotCall($array_push, ARR, `push`, 4);
$(ARR);
$(ARR);
$(NOOP, NOOP2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
const c = function() {
  debugger;
  $( a );
  return undefined;
};
const d = function() {
  debugger;
  $( "ok", a );
  return undefined;
};
$dotCall( $array_unshift, a, "unshift", d );
$( 4 );
$dotCall( $array_push, a, "push", 4 );
$( a );
$( a );
$( b, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const NOOP2 = function () {
  debugger;
  $(ARR);
  return undefined;
};
const x = function () {
  debugger;
  $(`ok`, ARR);
  return undefined;
};
const tmpMCF = ARR.unshift;
const count = $dotCall(tmpMCF, ARR, `unshift`, x);
$(count);
const tmpMCF$1 = ARR.push;
$dotCall(tmpMCF$1, ARR, `push`, count);
NOOP();
NOOP2();
$(NOOP, NOOP2);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) find me fast
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: ['<function>', 'a', 'b', 'c', 4]
 - 3: ['<function>', 'a', 'b', 'c', 4]
 - 4: '<function>', '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
