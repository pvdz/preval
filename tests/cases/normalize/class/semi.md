# Preval test case

# semi.md

> Normalize > Class > Semi
>
> Classes can have semi's. They shouldn't matter.

## Input

`````js filename=intro
class x {
  a() {}
  ;;;
  b() {}
}
$(new x().b());
`````


## Settled


`````js filename=intro
const x /*:class*/ /*truthy*/ = class {
  a() {
    debugger;
    return undefined;
  }
  b() {
    debugger;
    return undefined;
  }
};
const tmpMCOO /*:object*/ /*truthy*/ = new x();
const tmpMCF /*:unknown*/ = tmpMCOO.b;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `b`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = class {
  a() {}
  b() {}
};
const tmpMCOO = new x();
$(tmpMCOO.b());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
a(  ) {
  debugger;
  return undefined;
},b(  ) {
  debugger;
  return undefined;
}
};
const b = new a();
const c = b.b;
const d = $dotCall( c, b, "b" );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = class {
  a() {
    debugger;
    return undefined;
  }
  b() {
    debugger;
    return undefined;
  }
};
const tmpMCOO = new x();
const tmpMCF = tmpMCOO.b;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `b`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
