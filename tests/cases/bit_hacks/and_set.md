# Preval test case

# and_set.md

> Bit hacks > And set
>
> Checking whether both bits are set

## Input

`````js filename=intro
const a = x & 1;
const atest = a === 1;
if (atest) {
  const b = x & 4;
  const btest = b === 4;
  if (btest) {
    $('yes');
  } else {
    $('no 2');
  }
} else {
  $('no 1');
}
`````


## Settled


`````js filename=intro
const a /*:number*/ /*&1*/ /*oneBitAnded*/ = x & 1;
if (a) {
  const b /*:number*/ /*&4*/ /*oneBitAnded*/ = x & 4;
  if (b) {
    $(`yes`);
  } else {
    $(`no 2`);
  }
} else {
  $(`no 1`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (x & 1) {
  if (x & 4) {
    $(`yes`);
  } else {
    $(`no 2`);
  }
} else {
  $(`no 1`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x & 1;
if (a) {
  const b = x & 4;
  if (b) {
    $( "yes" );
  }
  else {
    $( "no 2" );
  }
}
else {
  $( "no 1" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = x & 1;
const atest = a === 1;
if (atest) {
  const b = x & 4;
  const btest = b === 4;
  if (btest) {
    $(`yes`);
  } else {
    $(`no 2`);
  }
} else {
  $(`no 1`);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
