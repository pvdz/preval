# Preval test case

# ident_member_simple_simple.md

> Normalize > Binding > Case-block > Ident member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch ($('a')) { case $('a'): let a = b.x = c; break; }
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const b /*:object*/ = { x: 2 };
if (tmpIfTest) {
  b.x = 3;
  $(1, b, 3);
} else {
  $(1, b, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(`a`) === $(`a`);
const b = { x: 2 };
if (tmpIfTest) {
  b.x = 3;
  $(1, b, 3);
} else {
  $(1, b, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
const d = { x: 2 };
if (c) {
  d.x = 3;
  $( 1, d, 3 );
}
else {
  $( 1, d, 3 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
