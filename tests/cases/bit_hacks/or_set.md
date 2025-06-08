# Preval test case

# or_set.md

> Bit hacks > Or set
>
> Checking whether either or both of two bits are set

## Input

`````js filename=intro
const a = x & 1;
let test = a === 1;
if (test) {
} else {
  const b = x & 4;
  test = b === 4;
}
if (test) {
  $('yes');
} else {
  $('no 2');
}
`````


## Settled


`````js filename=intro
const a /*:number*/ /*&1*/ /*oneBitAnded*/ = x & 1;
if (a) {
  $(`yes`);
} else {
  const b /*:number*/ /*&4*/ /*oneBitAnded*/ = x & 4;
  if (b) {
    $(`yes`);
  } else {
    $(`no 2`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (x & 1) {
  $(`yes`);
} else {
  if (x & 4) {
    $(`yes`);
  } else {
    $(`no 2`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x & 1;
if (a) {
  $( "yes" );
}
else {
  const b = x & 4;
  if (b) {
    $( "yes" );
  }
  else {
    $( "no 2" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = x & 1;
let test = a === 1;
if (test) {
  $(`yes`);
} else {
  const b = x & 4;
  test = b === 4;
  if (test) {
    $(`yes`);
  } else {
    $(`no 2`);
  }
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
