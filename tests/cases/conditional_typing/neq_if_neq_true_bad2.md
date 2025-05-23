# Preval test case

# neq_if_neq_true_bad2.md

> Conditional typing > Neq if neq true bad2
>
> Assignment that cannot be observed should be dropped

## Input

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = a !== 67636;
  throw `Preval: Cannot write to const binding \`a\``;
} else {
  f(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(67636);
const x /*:boolean*/ = a === 67636;
if (x) {
  f(`Preval: Cannot write to const binding \`a\``);
  $(false);
} else {
  throw `Preval: Cannot write to const binding \`a\``;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(67636) === 67636) {
  f(`Preval: Cannot write to const binding \`a\``);
  $(false);
} else {
  throw `Preval: Cannot write to const binding \`a\``;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 67636 );
const b = a === 67636;
if (b) {
  f( "Preval: Cannot write to const binding `a`" );
  $( false );
}
else {
  throw "Preval: Cannot write to const binding `a`";
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = a !== 67636;
  throw `Preval: Cannot write to const binding \`a\``;
} else {
  f(`Preval: Cannot write to const binding \`a\``);
  $(x);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

f


## Runtime Outcome


Should call `$` with:
 - 1: 67636
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
