# Preval test case

# multi-nested-assignment1.md

> Expr order > Multi-nested-assignment1
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order.

Making sure the closure outlining does not screw up with setters

## Input

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
let e = undefined;
let obj = {
  get c() {
    $('get');
    return undefined;
  },
  set c(x) {
    obj = 'boom'
    $('set');
    return undefined;
  },
};
a = function () {
  $('a');
  return obj;
};
b = function () {
  $('b');
  a = 21;
  return obj;
};
c = function () {
  $('c');
  a = 31;
  b = 32;
  return obj;
};
d = function () {
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return obj;
};
e = function () {
  $('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obj;
};
const tmpAssignMemLhsObj = a();
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const varInitAssignLhsComputedObj = b();
const varInitAssignLhsComputedObj$1 = c();
const varInitAssignLhsComputedObj$3 = d();
const varInitAssignLhsComputedRhs$3 = e();
varInitAssignLhsComputedObj$3.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpAssignMemRhs = varInitAssignLhsComputedRhs;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
let obj /*:unknown*/ = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    debugger;
    obj = `boom`;
    $(`set`);
    return undefined;
  },
};
let a /*:()=>unknown*/ = function () {
  debugger;
  $(`a`);
  return obj;
};
let b /*:()=>unknown*/ = function () {
  debugger;
  $(`b`);
  a = 21;
  return obj;
};
let c /*:()=>unknown*/ = function () {
  debugger;
  $(`c`);
  a = 31;
  b = 32;
  return obj;
};
let d /*:()=>unknown*/ = function () {
  debugger;
  $(`d`);
  a = 41;
  b = 42;
  c = 43;
  return obj;
};
const e /*:()=>unknown*/ = function () {
  debugger;
  $(`e`);
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obj;
};
const tmpAssignMemLhsObj /*:unknown*/ = a();
const varInitAssignLhsComputedObj /*:unknown*/ = b();
const varInitAssignLhsComputedObj$1 /*:unknown*/ = c();
const varInitAssignLhsComputedObj$3 /*:unknown*/ = d();
e();
const varInitAssignLhsComputedRhs$3 /*:unknown*/ = obj;
varInitAssignLhsComputedObj$3.x = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$3;
tmpAssignMemLhsObj.x = varInitAssignLhsComputedRhs$3;
$(a, b, c, d, e);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let obj = {
  get c() {
    $(`get`);
  },
  set c($$0) {
    obj = `boom`;
    $(`set`);
  },
};
let a = function () {
  $(`a`);
  return obj;
};
let b = function () {
  $(`b`);
  a = 21;
  return obj;
};
let c = function () {
  $(`c`);
  a = 31;
  b = 32;
  return obj;
};
let d = function () {
  $(`d`);
  a = 41;
  b = 42;
  c = 43;
  return obj;
};
const e = function () {
  $(`e`);
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obj;
};
const tmpAssignMemLhsObj = a();
const varInitAssignLhsComputedObj = b();
const varInitAssignLhsComputedObj$1 = c();
const varInitAssignLhsComputedObj$3 = d();
e();
const varInitAssignLhsComputedRhs$3 = obj;
varInitAssignLhsComputedObj$3.x = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$3;
tmpAssignMemLhsObj.x = varInitAssignLhsComputedRhs$3;
$(a, b, c, d, e);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  get c() {
    debugger;
    $( "get" );
    return undefined;
  },
  set c( $$0 ) {
    debugger;
    a = "boom";
    $( "set" );
    return undefined;
  },
};
let b = function() {
  debugger;
  $( "a" );
  return a;
};
let c = function() {
  debugger;
  $( "b" );
  b = 21;
  return a;
};
let d = function() {
  debugger;
  $( "c" );
  b = 31;
  c = 32;
  return a;
};
let e = function() {
  debugger;
  $( "d" );
  b = 41;
  c = 42;
  d = 43;
  return a;
};
const f = function() {
  debugger;
  $( "e" );
  b = 51;
  c = 52;
  d = 53;
  e = 54;
  return a;
};
const g = b();
const h = c();
const i = d();
const j = e();
f();
const k = a;
j.x = k;
i.x = k;
h.x = k;
g.x = k;
$( b, c, d, e, f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'd'
 - 5: 'e'
 - 6: 51, 52, 53, 54, '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
