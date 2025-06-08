# Preval test case

# decl_else_upd.md

> Obj mutation > Decl else upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
if ($) {
} else {
  blob.thing = 'boing';
}
$(blob);
`````


## Settled


`````js filename=intro
const blob /*:object*/ /*truthy*/ = { thing: `woop` };
if ($) {
  $(blob);
} else {
  blob.thing = `boing`;
  $(blob);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  $(blob);
} else {
  blob.thing = `boing`;
  $(blob);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "woop" };
if ($) {
  $( a );
}
else {
  a.thing = "boing";
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  $(blob);
} else {
  blob.thing = `boing`;
  $(blob);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { thing: '"woop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
