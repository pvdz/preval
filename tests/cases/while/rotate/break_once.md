# Preval test case

# break_once.md

> While > Rotate > Break once
>
> Rotating statements in a loop that breaks once

## Input

`````js filename=intro
let x = /foo/;
x.foo = `object`; // Move this inside the while
while ($LOOP_UNROLL_10) {
  const tmp = x.foo;
  $(tmp);
  const end = $(x);
  if (end) {
    break;
  } else {
    x = /foo/;
    x.foo = `object`; // Rotate this line ^^
  }
}
`````


## Settled


`````js filename=intro
const x /*:regex*/ = /foo/;
x.foo = `object`;
const tmp /*:unknown*/ = x.foo;
$(tmp);
const end /*:unknown*/ = $(x);
if (end) {
} else {
  let tmpClusterSSA_x /*:regex*/ = /foo/;
  tmpClusterSSA_x.foo = `object`;
  while ($LOOP_UNROLL_9) {
    const tmp$1 /*:unknown*/ = tmpClusterSSA_x.foo;
    $(tmp$1);
    const end$1 /*:unknown*/ = $(tmpClusterSSA_x);
    if (end$1) {
      break;
    } else {
      tmpClusterSSA_x = /foo/;
      tmpClusterSSA_x.foo = `object`;
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = /foo/;
x.foo = `object`;
$(x.foo);
if (!$(x)) {
  let tmpClusterSSA_x = /foo/;
  tmpClusterSSA_x.foo = `object`;
  while (true) {
    $(tmpClusterSSA_x.foo);
    if ($(tmpClusterSSA_x)) {
      break;
    } else {
      tmpClusterSSA_x = /foo/;
      tmpClusterSSA_x.foo = `object`;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
a.foo = "object";
const b = a.foo;
$( b );
const c = $( a );
if (c) {

}
else {
  let d = /foo/;
  d.foo = "object";
  while ($LOOP_UNROLL_9) {
    const e = d.foo;
    $( e );
    const f = $( d );
    if (f) {
      break;
    }
    else {
      d = /foo/;
      d.foo = "object";
    }
  }
}
`````


## Todos triggered


- regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'object'
 - 2: { foo: '"object"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
