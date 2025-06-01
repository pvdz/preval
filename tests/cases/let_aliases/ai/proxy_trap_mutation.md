# Preval test case

# proxy_trap_mutation.md

> Let aliases > Ai > Proxy trap mutation
>
> Mutation in a Proxy trap (should not alias, but Preval may ignore Proxy)

## Input

`````js filename=intro
let x = $("val");
const a = x;
const p = new Proxy({}, { get() { x = "changed"; return 1; } });
p.foo;
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpNewCallee /*:unknown*/ = Proxy;
const tmpCalleeParam /*:object*/ = {};
const tmpCalleeParam$1 /*:object*/ = {
  get() {
    debugger;
    x = `changed`;
    return 1;
  },
};
const p /*:object*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
p.foo;
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpNewCallee = Proxy;
const tmpCalleeParam = {};
const tmpCalleeParam$1 = {
  get() {
    x = `changed`;
    return 1;
  },
};
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1).foo;
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = Proxy;
const d = {};
const e = { get(  ) {
  debugger;
  a = "changed";
  return 1;
} };
const f = new c( d, e );
f.foo;
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpNewCallee = Proxy;
let tmpCalleeParam = {};
let tmpCalleeParam$1 = {
  get() {
    debugger;
    x = `changed`;
    return 1;
  },
};
const p = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
p.foo;
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Proxy


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
