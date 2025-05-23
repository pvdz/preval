# Preval test case

# neq_if_neq_true_bad3.md

> Conditional typing > Neq if neq true bad3
>
> Assignment that cannot be observed should be dropped

## Input

`````js filename=intro
const a = $(null)
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(null);
const x /*:boolean*/ = a === 67636;
if (x) {
  $(`Preval: Cannot write to const binding \`a\``);
  $(false);
} else {
  throw `Preval: Assignment to constant variable: \`a = 10;\``;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(null) === 67636) {
  $(`Preval: Cannot write to const binding \`a\``);
  $(false);
} else {
  throw `Preval: Assignment to constant variable: \`a = 10;\``;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( null );
const b = a === 67636;
if (b) {
  $( "Preval: Cannot write to const binding `a`" );
  $( false );
}
else {
  throw "Preval: Assignment to constant variable: `a = 10;`";
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(null);
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
  $(x);
} else {
  $(`Preval: Cannot write to const binding \`a\``);
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: null
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
