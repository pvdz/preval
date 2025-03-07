# Preval test case

# ternary_consequent.md

> Normalize > Pattern > Assignment > Base contexts > Ternary consequent
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? ({ x } = 1) : c;
`````

## Settled


`````js filename=intro
if (a) {
  x = (1).x;
} else {
  c;
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (a) {
  x = (1).x;
} else {
  c;
}
`````

## Pre Normal


`````js filename=intro
a ? ({ x: x } = 1) : c;
`````

## Normalized


`````js filename=intro
if (a) {
  const tmpAssignObjPatternRhs = 1;
  x = tmpAssignObjPatternRhs.x;
} else {
  c;
}
`````

## PST Settled
With rename=true

`````js filename=intro
if (a) {
  x = 1.x;
}
else {
  c;
}
`````

## Globals

BAD@! Found 3 implicit global bindings:

a, x, c

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
