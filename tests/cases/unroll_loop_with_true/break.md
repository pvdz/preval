# Preval test case

# break.md

> Unroll loop with true > Break
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
while (true) {
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else {
      $('third');
    }
}
`````


## Settled


`````js filename=intro
const test /*:unknown*/ = $(`first`);
$(`second`);
if (test) {
} else {
  while ($LOOP_UNROLLS_LEFT_10) {
    $(`third`);
    const test$1 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$1) {
      break;
    } else {
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const test = $(`first`);
$(`second`);
if (!test) {
  while (true) {
    $(`third`);
    const test$1 = $(`first`);
    $(`second`);
    if (test$1) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "first" );
$( "second" );
if (a) {

}
else {
  while ($LOOP_UNROLLS_LEFT_10) {
    $( "third" );
    const b = $( "first" );
    $( "second" );
    if (b) {
      break;
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const test = $(`first`);
  $(`second`);
  if (test) {
    break;
  } else {
    $(`third`);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
