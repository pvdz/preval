# Preval test case

# multi-nested-assignment.md

> Expr order > Multi-nested-assignment
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order.

## Input

`````js filename=intro
let obj = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};
var a = function(){ $('a'); return obj; }
var b = function(){ $('b'); a = 21; return obj; }
var c = function(){ $('c'); a = 31; b = 32; return obj; }
var d = function(){ $('d'); a = 41; b = 42; c = 43; return obj; }
var e = function(){ $('e'); a = 51; b = 52; c = 53; d = 54; return obj; }
a().x = b().x = c().x = d().x = e()
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    debugger;
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
const e /*:()=>object*/ = function () {
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
varInitAssignLhsComputedObj$3.x = obj;
varInitAssignLhsComputedObj$1.x = obj;
varInitAssignLhsComputedObj.x = obj;
tmpAssignMemLhsObj.x = obj;
$(a, b, c, d, e);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = {
  get c() {
    $(`get`);
  },
  set c($$0) {
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
varInitAssignLhsComputedObj$3.x = obj;
varInitAssignLhsComputedObj$1.x = obj;
varInitAssignLhsComputedObj.x = obj;
tmpAssignMemLhsObj.x = obj;
$(a, b, c, d, e);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  get c() {
    debugger;
    $( "get" );
    return undefined;
  },
  set c( $$0 ) {
    debugger;
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
j.x = a;
i.x = a;
h.x = a;
g.x = a;
$( b, c, d, e, f );
`````


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
