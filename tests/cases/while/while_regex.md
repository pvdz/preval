# Preval test case

# while_regex.md

> While > While regex
>
> A regex is always truthy

## Input

`````js filename=intro
const x = /foo/; 
while (x) {
  $(x);
}
`````


## Settled


`````js filename=intro
const x /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = new $regex_constructor(`foo`, ``);
while (true) {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = new $regex_constructor(`foo`, ``);
while (true) {
  if (x) {
    $(x);
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: {}
 - 3: {}
 - 4: {}
 - 5: {}
 - 6: {}
 - 7: {}
 - 8: {}
 - 9: {}
 - 10: {}
 - 11: {}
 - 12: {}
 - 13: {}
 - 14: {}
 - 15: {}
 - 16: {}
 - 17: {}
 - 18: {}
 - 19: {}
 - 20: {}
 - 21: {}
 - 22: {}
 - 23: {}
 - 24: {}
 - 25: {}
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
