# Preval test case

# alias_nested_ifs.md

> If test aliased > Alias nested ifs
>
> nested ifs, let alias used in inner if branch, should be replaced

## Input

`````js filename=intro
let a = !c;
if (c) {
  if (x) {
    $(a); // expect: $(false)
  }
}
`````


## Settled


`````js filename=intro
if (c) {
  if (x) {
    c;
    $(false);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (c) {
  if (x) {
    c;
    $(false);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  if (x) {
    c;
    $( false );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = !c;
if (c) {
  if (x) {
    $(a);
  } else {
  }
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

c, x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
