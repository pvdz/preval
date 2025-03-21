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
const a /*:number*/ = x & 1;
if (a) {
  const b /*:number*/ = x & 4;
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


## Todos triggered


None


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
