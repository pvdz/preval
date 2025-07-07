# Preval test case

# fake_cache.md

> Type tracked > Fake cache
>
> Caching without persisting the cache object

## Input

`````js filename=intro
const x = $(1);
const y = $('y');
const z = $('fail');

const obj = {};
const prop = Number(x) + y;
if (obj[prop]) {
  $('HIT');
} else {
  $('MISS');
  obj[prop] = z;
}
$('end');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const y /*:unknown*/ = $(`y`);
$(`fail`);
$coerce(x, `number`);
y + 0;
$(`MISS`);
$(`end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
const y = $(`y`);
$(`fail`);
Number(x);
y + 0;
$(`MISS`);
$(`end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( "y" );
$( "fail" );
$coerce( a, "number" );
b + 0;
$( "MISS" );
$( "end" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const y = $(`y`);
const z = $(`fail`);
const obj = {};
const tmpBinLhs = $coerce(x, `number`);
const prop = tmpBinLhs + y;
const tmpIfTest = obj[prop];
if (tmpIfTest) {
  $(`HIT`);
  $(`end`);
} else {
  $(`MISS`);
  obj[prop] = z;
  $(`end`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'y'
 - 3: 'fail'
 - 4: 'MISS'
 - 5: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
