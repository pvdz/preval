# Preval test case

# identical_return_foo.md

> Normalize > If > Identical return foo
>
> If both branches just return undefined then the if is redundant

This is an artifact that can happen during normalization

## Input

`````js filename=intro
const foo = $();
function f() {
  if ($) {
    return foo;
  } else {
    return foo;
  }
}
function g() {
  if ($) return f();
}
if ($) $(g());
`````


## Settled


`````js filename=intro
const foo /*:unknown*/ = $();
if ($) {
  $(foo);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const foo = $();
if ($) {
  $(foo);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if ($) {
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
