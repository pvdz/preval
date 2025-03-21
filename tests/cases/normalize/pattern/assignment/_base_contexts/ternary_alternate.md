# Preval test case

# ternary_alternate.md

> Normalize > Pattern > Assignment > Base contexts > Ternary alternate
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? b : ({ x } = 1);
`````


## Settled


`````js filename=intro
if (a) {
  b;
} else {
  x = (1).x;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (a) {
  b;
} else {
  x = (1).x;
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (a) {
  b;
}
else {
  x = 1.x;
}
`````


## Todos triggered


None


## Globals


BAD@! Found 3 implicit global bindings:

a, b, x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
