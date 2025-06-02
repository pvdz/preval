# Preval test case

# alias_multiple_aliases.md

> If test aliased > Alias multiple aliases
>
> multiple let/const aliases, each should be replaced in their own if branch

## Input

`````js filename=intro
let a = !c;
let b = !d;
if (c) {
  $(a); // expect: $(false)
}
if (d) {
  $(b); // expect: $(false)
}
`````


## Settled


`````js filename=intro
if (c) {
  $(false);
} else {
}
if (d) {
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (c) {
  $(false);
}
if (d) {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  $( false );
}
if (d) {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = !c;
let b = !d;
if (c) {
  $(a);
} else {
}
if (d) {
  $(b);
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

c, d


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
