# Preval test case

# or_bool_used.md

> Bit hacks > Or bool used
>
> Orring with a non-zero number always results in truthy

## Input

`````js filename=intro
const x = $(1234);
const y = x | 200;
if (y) {
  $('ALWAYS' + y);
} else {
  $('FAIL');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1234);
const y /*:number*/ /*truthy*/ /*|200*/ = x | 200;
const tmpCalleeParam /*:string*/ /*truthy*/ = `ALWAYS${y}`;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(1234) | 200;
$(`ALWAYS${y}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1234 );
const b = a | 200;
const c = `ALWAYS${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1234);
const y = x | 200;
if (y) {
  const tmpStringConcatL = $coerce(y, `plustr`);
  let tmpCalleeParam = `ALWAYS${tmpStringConcatL}`;
  $(tmpCalleeParam);
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
 - 2: 'ALWAYS1242'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
