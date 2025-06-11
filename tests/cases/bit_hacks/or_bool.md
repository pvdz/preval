# Preval test case

# or_bool.md

> Bit hacks > Or bool
>
> Orring with a non-zero number always results in truthy

## Input

`````js filename=intro
const x = $(1234);
const y = x | 200;
if (y) {
  $('ALWAYS');
} else {
  $('FAIL');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1234);
x ** 0;
$(`ALWAYS`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1234) ** 0;
$(`ALWAYS`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1234 );
a ** 0;
$( "ALWAYS" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1234);
const y = x | 200;
if (y) {
  $(`ALWAYS`);
} else {
  $(`FAIL`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1234
 - 2: 'ALWAYS'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
