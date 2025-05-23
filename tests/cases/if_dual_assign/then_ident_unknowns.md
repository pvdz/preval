# Preval test case

# then_ident_unknowns.md

> If dual assign > Then ident unknowns
>
> This case should make sure we don't accidentally set a var to a value it should not be having

## Input

`````js filename=intro
let x = false;
const b = $('x', 'one');
const c = $('y', 'one');
const a = b === c;
if (a) {
  x = a; // Can be eliminated. Should not cause x to be set to a.
} else {
}
$(x, 'middle');
if (a) {
  x = true;
} else {
  x = false;
}
$(x, 'end');
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(`x`, `one`);
const c /*:unknown*/ = $(`y`, `one`);
const a /*:boolean*/ = b === c;
$(a, `middle`);
$(a, `end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`x`, `one`) === $(`y`, `one`);
$(a, `middle`);
$(a, `end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x", "one" );
const b = $( "y", "one" );
const c = a === b;
$( c, "middle" );
$( c, "end" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = false;
const b = $(`x`, `one`);
const c = $(`y`, `one`);
const a = b === c;
if (a) {
  x = a;
  $(a, `middle`);
} else {
  $(x, `middle`);
}
if (a) {
  x = true;
  $(x, `end`);
} else {
  x = false;
  $(x, `end`);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x', 'one'
 - 2: 'y', 'one'
 - 3: false, 'middle'
 - 4: false, 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
