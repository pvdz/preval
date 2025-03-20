# Preval test case

# base_excl.md

> Bool redundancy > Base excl
>
> Bool coercions that are only used in bool contexts can be dropped because they cannot be observed

## Input

`````js filename=intro
const x = !($);
$(!x);
if ($(0)) {
  $('fail');
} else {
  $(Boolean(x));
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:boolean*/ = Boolean($);
$(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(`fail`);
} else {
  const x /*:boolean*/ = !$;
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($));
if ($(0)) {
  $(`fail`);
} else {
  $(!$);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Boolean( $ );
$( a );
const b = $( 0 );
if (b) {
  $( "fail" );
}
else {
  const c = !$;
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 0
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
