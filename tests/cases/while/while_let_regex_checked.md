# Preval test case

# while_let_regex_checked.md

> While > While let regex checked
>
> A regex is always truthy

The point of this check is to verify that the system treats regex like the
object it is and not like an immutable primitive.

It may fluke an optimization where it incorrectly eliminates and outlines
the property. But at the time of writing, this was working correct.

## Input

`````js filename=intro
function check(r) {
  $(r.foo);
}
let x = /foo/; 
while (x) {
  check(x);
  x = /foo/;
  x.foo = "object";
}
`````


## Settled


`````js filename=intro
let x /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:unknown*/ = x.foo;
  $(tmpCalleeParam);
  x = new $regex_constructor(`foo`, ``);
  x.foo = `object`;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = new $regex_constructor(`foo`, ``);
while (true) {
  $(x.foo);
  x = new $regex_constructor(`foo`, ``);
  x.foo = `object`;
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = new $regex_constructor( "foo", "" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a.foo;
  $( b );
  a = new $regex_constructor( "foo", "" );
  a.foo = "object";
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let check = function ($$0) {
  let r = $$0;
  debugger;
  let tmpCalleeParam = r.foo;
  $(tmpCalleeParam);
  return undefined;
};
let x = new $regex_constructor(`foo`, ``);
while (true) {
  if (x) {
    check(x);
    x = new $regex_constructor(`foo`, ``);
    x.foo = `object`;
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: NewExpression
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 'object'
 - 3: 'object'
 - 4: 'object'
 - 5: 'object'
 - 6: 'object'
 - 7: 'object'
 - 8: 'object'
 - 9: 'object'
 - 10: 'object'
 - 11: 'object'
 - 12: 'object'
 - 13: 'object'
 - 14: 'object'
 - 15: 'object'
 - 16: 'object'
 - 17: 'object'
 - 18: 'object'
 - 19: 'object'
 - 20: 'object'
 - 21: 'object'
 - 22: 'object'
 - 23: 'object'
 - 24: 'object'
 - 25: 'object'
 - 26: 'object'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
