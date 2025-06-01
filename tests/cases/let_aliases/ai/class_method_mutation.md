# Preval test case

# class_method_mutation.md

> Let aliases > Ai > Class method mutation
>
> Mutation in a class method (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
class C { mutate() { x = "changed"; } }
new C().mutate();
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const C /*:class*/ = class {
  mutate() {
    debugger;
    x = `changed`;
    return undefined;
  }
};
const tmpMCOO /*:object*/ = new C();
const tmpMCF /*:unknown*/ = tmpMCOO.mutate;
$dotCall(tmpMCF, tmpMCOO, `mutate`);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
const C = class {
  mutate() {
    x = `changed`;
  }
};
const tmpMCOO = new C();
tmpMCOO.mutate();
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = class   {
mutate(  ) {
  debugger;
  a = "changed";
  return undefined;
}
};
const d = new c();
const e = d.mutate;
$dotCall( e, d, "mutate" );
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
let C = class {
  mutate() {
    debugger;
    x = `changed`;
    return undefined;
  }
};
const tmpMCOO = new C();
const tmpMCF = tmpMCOO.mutate;
$dotCall(tmpMCF, tmpMCOO, `mutate`);
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
