# Preval test case

# assignment_from_string_key2.md

> Normalize > Object > Assignment from string key2
>
> Should convert the key to a regular property

## Input

`````js filename=intro
const o = {x: 1};
let y = 1;
if ($(true)) {
  y = o['x'] ;
}
$(y, o);
`````


## Settled


`````js filename=intro
$(true);
const o /*:object*/ = { x: 1 };
$(1, o);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(1, { x: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
const a = { x: 1 };
$( 1, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const o = { x: 1 };
let y = 1;
const tmpIfTest = $(true);
if (tmpIfTest) {
  y = o.x;
  $(y, o);
} else {
  $(y, o);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 1, { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
