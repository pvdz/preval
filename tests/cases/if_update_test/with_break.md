# Preval test case

# with_break.md

> If update test > With break
>
> This covered the true_alt_falsy_empty_alt case

## Input

`````js filename=intro
let count = true;
let chk = $(true);
if (chk) {
} else {
  count = false;
}
while (count) {
  $('inside');
}
`````


## Settled


`````js filename=intro
const chk /*:unknown*/ = $(true);
if (chk) {
  while ($LOOP_NO_UNROLLS_LEFT) {
    $(`inside`);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  while (true) {
    $(`inside`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  while ($LOOP_NO_UNROLLS_LEFT) {
    $( "inside" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let count = true;
let chk = $(true);
if (chk) {
} else {
  count = false;
}
while (true) {
  if (count) {
    $(`inside`);
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) Support this ident in isFree CallExpression: $boolean_constructor
- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'inside'
 - 3: 'inside'
 - 4: 'inside'
 - 5: 'inside'
 - 6: 'inside'
 - 7: 'inside'
 - 8: 'inside'
 - 9: 'inside'
 - 10: 'inside'
 - 11: 'inside'
 - 12: 'inside'
 - 13: 'inside'
 - 14: 'inside'
 - 15: 'inside'
 - 16: 'inside'
 - 17: 'inside'
 - 18: 'inside'
 - 19: 'inside'
 - 20: 'inside'
 - 21: 'inside'
 - 22: 'inside'
 - 23: 'inside'
 - 24: 'inside'
 - 25: 'inside'
 - 26: 'inside'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
