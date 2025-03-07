# Preval test case

# pattern.md

> Normalize > Binding > For-a > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (let [x, y] = z;false;) $(x, y, z);
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
let x = 1,
  y = 2,
  z = [10, 20, 30];
{
  let [x$1, y$1] = z;
  while (false) {
    $(x$1, y$1, z);
  }
}
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let bindingPatternArrRoot = z;
let arrPatternSplat = [...bindingPatternArrRoot];
let x$1 = arrPatternSplat[0];
let y$1 = arrPatternSplat[1];
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
