# Preval test case

# then_true_both.md

> If dual assign > Then true both
>
> This case should make sure we don't accidentally set a var to a value it should not be having

## Input

`````js filename=intro
let x = false;
const b = $('x', 'one');
const c = $('x', 'one');
const a = b === c;
if (a) {
  x = true; // Can be eliminated. Should not cause x to be set to a.
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
const c /*:unknown*/ = $(`x`, `one`);
const a /*:boolean*/ = b === c;
$(a, `middle`);
$(a, `end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`x`, `one`) === $(`x`, `one`);
$(a, `middle`);
$(a, `end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x", "one" );
const b = $( "x", "one" );
const c = a === b;
$( c, "middle" );
$( c, "end" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x', 'one'
 - 2: 'x', 'one'
 - 3: true, 'middle'
 - 4: true, 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
