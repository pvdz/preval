# Preval test case

# objlit_prop_vardecl_obj_spy_prop.md

> Object literal > Objlit prop vardecl obj spy prop
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
// Custom iterable object that spies
const oops = {
  toString(){ $('toString') },
  valueOf(){ $('valueOf') },
};
const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
const f = { [oops]: 123 };
const tmpCalleeParam$1 /*:unknown*/ = o.x; // <- cannot inline safely because f will spy
$(tmpCalleeParam$1);
o.x = 10; // <-- this cannot get hoisted above the [oops]
f();
f();
f();
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const oops /*:object*/ = {
  toString() {
    debugger;
    $(`toString`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return undefined;
  },
};
const f /*:object*/ = { [oops]: 123 };
$(tmpObjLitVal);
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const oops = {
  toString() {
    $(`toString`);
  },
  valueOf() {
    $(`valueOf`);
  },
};
const f = { [oops]: 123 };
$(tmpObjLitVal);
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  toString(  ) {
    debugger;
    $( "toString" );
    return undefined;
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return undefined;
  },
};
const c = { [ b ]: 123 };
$( a );
c();
c();
c();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'toString'
 - 3: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
