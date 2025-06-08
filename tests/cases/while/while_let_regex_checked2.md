# Preval test case

# while_let_regex_checked2.md

> While > While let regex checked2
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
  if ($(x)) break;
  x = /foo/;
  x.foo = "object";
}
`````


## Settled


`````js filename=intro
const x /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
const tmpCalleeParam /*:unknown*/ = x.foo;
$(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(x);
if (tmpIfTest) {
} else {
  let tmpClusterSSA_x /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
  tmpClusterSSA_x.foo = `object`;
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 /*:unknown*/ = tmpClusterSSA_x.foo;
    $(tmpCalleeParam$1);
    const tmpIfTest$1 /*:unknown*/ = $(tmpClusterSSA_x);
    if (tmpIfTest$1) {
      break;
    } else {
      tmpClusterSSA_x = new $regex_constructor(`foo`, ``);
      tmpClusterSSA_x.foo = `object`;
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = new $regex_constructor(`foo`, ``);
$(x.foo);
if (!$(x)) {
  let tmpClusterSSA_x = new $regex_constructor(`foo`, ``);
  tmpClusterSSA_x.foo = `object`;
  while (true) {
    $(tmpClusterSSA_x.foo);
    if ($(tmpClusterSSA_x)) {
      break;
    } else {
      tmpClusterSSA_x = new $regex_constructor(`foo`, ``);
      tmpClusterSSA_x.foo = `object`;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "" );
const b = a.foo;
$( b );
const c = $( a );
if (c) {

}
else {
  let d = new $regex_constructor( "foo", "" );
  d.foo = "object";
  while ($LOOP_UNROLL_10) {
    const e = d.foo;
    $( e );
    const f = $( d );
    if (f) {
      break;
    }
    else {
      d = new $regex_constructor( "foo", "" );
      d.foo = "object";
    }
  }
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
    const tmpIfTest = $(x);
    if (tmpIfTest) {
      break;
    } else {
      x = new $regex_constructor(`foo`, ``);
      x.foo = `object`;
    }
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
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
