# Preval test case

# decl_if_upd.md

> Obj mutation > Decl if upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
if ($) {
  blob.thing = 'boing';
} else {
}
$(blob);
`````

## Settled


`````js filename=intro
const blob /*:object*/ = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
} else {
}
$(blob);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
}
$(blob);
`````

## Pre Normal


`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
} else {
}
$(blob);
`````

## Normalized


`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
} else {
}
$(blob);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "woop" };
if ($) {
  a.thing = "boing";
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
