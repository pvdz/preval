# Preval test case

# nested_getters_middle_test1.md

> Normalize > Expressions > Nested getters middle test1
>
> Trying to minimize a regression

Oh right, that's a tool I still need to write. This led to an inifite loop, temporarily.

## Input

`````js filename=intro
const b = {
  get foo() {
  },
};
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
const b = {
  get foo() {
    debugger;
  },
};
`````

## Normalized


`````js filename=intro
const b = {
  get foo() {
    debugger;
    return undefined;
  },
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
