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
const tmpCalleeParam /*:boolean*/ = $boolean_constructor($);
$(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(`fail`);
} else {
  const tmpCalleeParam$1 /*:boolean*/ = !$;
  $(tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($));
if ($(0)) {
  $(`fail`);
} else {
  $(!$);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $boolean_constructor( $ );
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


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
