# Preval test case

# class_computed_key_extends2.md

> Normalize > Class > Class computed key extends2
>
> Make sure the transform of computed key does not change something that can change the super class value

## Input

`````js filename=intro
const y = 'y';
class x {
  x(){ }
}

x().y;
`````


## Settled


`````js filename=intro
const x /*:class*/ /*truthy*/ = class {
  x() {
    debugger;
    return undefined;
  }
};
const tmpCompObj /*:unknown*/ = x();
tmpCompObj.y;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = class {
  x() {}
};
x().y;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
x(  ) {
  debugger;
  return undefined;
}
};
const b = a();
b.y;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const y = `y`;
let x = class {
  x() {
    debugger;
    return undefined;
  }
};
const tmpCompObj = x();
tmpCompObj.y;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Class constructor x cannot be invoked without 'new' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
