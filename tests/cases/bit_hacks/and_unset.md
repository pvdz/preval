# Preval test case

# and_unset.md

> Bit hacks > And unset
>
> Checking whether both bits are unset

## Input

`````js filename=intro
const a = x & 1;
const atest = a === 0;
if (atest) {
  const b = x & 4;
  const btest = b === 0;
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
  $(`no 1`);
} else {
  const b /*:number*/ = x & 4;
  if (b) {
    $(`no 2`);
  } else {
    $(`yes`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (x & 1) {
  $(`no 1`);
} else {
  if (x & 4) {
    $(`no 2`);
  } else {
    $(`yes`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x & 1;
if (a) {
  $( "no 1" );
}
else {
  const b = x & 4;
  if (b) {
    $( "no 2" );
  }
  else {
    $( "yes" );
  }
}
`````


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
