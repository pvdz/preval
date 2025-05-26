# Preval test case

# base_let_else2.md

> If test merging > Base let else2
>
> When back to back ifs test on the same constant, the ifs can be merged safely

Regression output from this test

## Input

`````js filename=intro
const testVar /*:unknown*/ = $(true);
let tern /*:boolean*/ = !testVar;         // tern is a "ternary const"
if (testVar) {
  $(`b`);
  tern = true;                            // testvar=true so tern was false, but now it's true
} else {
  $(`a`);                                 // testvar=false so second is true
}
if (tern) {                               // always true
  $(`d`);
} else {
  $(`c`);                                 // dead code
}
`````


## Settled


`````js filename=intro
const testVar /*:unknown*/ = $(true);
if (testVar) {
  $(`b`);
  $(`d`);
} else {
  $(`a`);
  $(`d`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`b`);
  $(`d`);
} else {
  $(`a`);
  $(`d`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "b" );
  $( "d" );
}
else {
  $( "a" );
  $( "d" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const testVar = $(true);
let tern = !testVar;
if (testVar) {
  $(`b`);
  tern = true;
} else {
  $(`a`);
}
if (tern) {
  $(`d`);
} else {
  $(`c`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'b'
 - 3: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
