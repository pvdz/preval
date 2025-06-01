# Preval test case

# fn_passed_as_obj_method.md

> Let aliases > Ai > Fn passed as obj method
>
> Mutation in a function passed as a method to an object (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
const obj = {
  mutate() { x = "changed"; }
};
obj.mutate();
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const obj /*:object*/ = {
  mutate() {
    debugger;
    x = `changed`;
    return undefined;
  },
};
const tmpMCF /*:unknown*/ = obj.mutate;
$dotCall(tmpMCF, obj, `mutate`);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
const obj = {
  mutate() {
    x = `changed`;
  },
};
obj.mutate();
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = { mutate(  ) {
  debugger;
  a = "changed";
  return undefined;
} };
const d = c.mutate;
$dotCall( d, c, "mutate" );
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const obj = {
  mutate() {
    debugger;
    x = `changed`;
    return undefined;
  },
};
const tmpMCF = obj.mutate;
$dotCall(tmpMCF, obj, `mutate`);
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
