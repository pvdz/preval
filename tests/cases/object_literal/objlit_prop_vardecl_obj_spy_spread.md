# Preval test case

# objlit_prop_vardecl_obj_spy_spread.md

> Object literal > Objlit prop vardecl obj spy spread
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
// Custom iterable object that spies
const oops = {
  // When the object is spread, this getter is triggered
  get x() {
    const sigh = $('x'); // dont inline o.x here...
    $('iterator called, o.x=', o[sigh]);
    return 100;
  },
};

const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
const f = { ...oops };
const tmpCalleeParam$1 /*:unknown*/ = o.x; // <- cannot inline safely because f will spy
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
const oops /*:object*/ /*truthy*/ = {
  get x() {
    debugger;
    const sigh /*:unknown*/ = $(`x`);
    const tmpCalleeParam /*:unknown*/ = o[sigh];
    $(`iterator called, o.x=`, tmpCalleeParam);
    return 100;
  },
};
const f /*:object*/ /*truthy*/ = { ...oops };
$(tmpObjLitVal);
o.x = 10;
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const oops = {
  get x() {
    const sigh = $(`x`);
    $(`iterator called, o.x=`, o[sigh]);
    return 100;
  },
};
const f = { ...oops };
$(tmpObjLitVal);
o.x = 10;
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: a };
const c = { get x() {
  debugger;
  const d = $( "x" );
  const e = b[ d ];
  $( "iterator called, o.x=", e );
  return 100;
} };
const f = { ... c };
$( a );
b.x = 10;
f();
f();
f();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const oops = {
  get x() {
    debugger;
    const sigh = $(`x`);
    let tmpCalleeParam = o[sigh];
    $(`iterator called, o.x=`, tmpCalleeParam);
    return 100;
  },
};
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const f = { ...oops };
const tmpCalleeParam$1 = o.x;
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'x'
 - 3: 'iterator called, o.x=', 1
 - 4: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
