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

## Pre Normal


`````js filename=intro
const y = `y`;
let x = class {
  [y]() {
    debugger;
  }
};
`````

## Normalized


`````js filename=intro
const y = `y`;
let x = class {
  [y]() {
    debugger;
    return undefined;
  }
};
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
