# Preval test case

# class_computed_key_ref.md

> Normalize > Class > Class computed key ref
>
> Make sure the transform of computed key does not change something that can change the super class value

## Input

`````js filename=intro
const y = 'y';
class x {
  [y](){}
}
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const y = `y`;
let x = class {
  [y]() {
    debugger;
    return undefined;
  }
};
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
