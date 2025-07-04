# Preval test case

# ai_rule302_instanceof_opaque_obj_ctor.md

> Ai > Ai3 > Ai rule302 instanceof opaque obj ctor
>
> Test: instanceof operator with an opaque object and an opaque constructor.

## Input

`````js filename=intro
// Expected: op_instanceof(obj, Ctor); (or equivalent, operation preserved)
function MyClass() {}
let obj = $('obj', new MyClass());
let Ctor = $('Ctor', MyClass);
let result = $('result', obj instanceof Ctor);
`````


## Settled


`````js filename=intro
const MyClass /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = new MyClass();
const obj /*:unknown*/ = $(`obj`, tmpCalleeParam);
const Ctor /*:unknown*/ = $(`Ctor`, MyClass);
const tmpCalleeParam$1 /*:boolean*/ = obj instanceof Ctor;
$(`result`, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const MyClass = function $pcompiled() {};
const obj = $(`obj`, new MyClass());
$(`result`, obj instanceof $(`Ctor`, MyClass));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
const c = new a();
const d = $( "obj", c );
const e = $( "Ctor", a );
const f = d instanceof e;
$( "result", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let MyClass = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam = new MyClass();
let obj = $(`obj`, tmpCalleeParam);
let Ctor = $(`Ctor`, MyClass);
let tmpCalleeParam$1 = obj instanceof Ctor;
let result = $(`result`, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'obj', {}
 - 2: 'Ctor', '<function>'
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not an object ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
