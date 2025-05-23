# Preval test case

# logical1.md

> Normalize > Branching > Logical1
>
> The logical operators should normalize to concrete branching logic

## Input

`````js filename=intro
let x = a;
if (x) {
  x = b;
}
if (x) {
  c;
} else {
  d;
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ /*ternaryConst*/ = a;
if (a) {
  x = b;
} else {
}
if (x) {
  c;
} else {
  d;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = a;
if (a) {
  x = b;
}
if (x) {
  c;
} else {
  d;
}
`````


## PST Settled
With rename=true

`````js filename=intro
let e = a;
if (a) {
  e = b;
}
if (e) {
  c;
}
else {
  d;
}
`````


## Todos triggered


None


## Globals


BAD@! Found 4 implicit global bindings:

a, b, c, d


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
