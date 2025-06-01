# Preval test case

# try_throw_catch_noop.md

> Tofix > try throw catch noop
>
> With primitive, we can drop this case.

## Input

`````js filename=intro
// With primitive, we can drop this case.
try {
  throw "one";
}
catch (a) {
}
`````


## Settled


`````js filename=intro
try {
  throw `one`;
} catch (a) {}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `one`;
} catch (a) {}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "one";
}
catch (a) {

}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  throw `one`;
} catch (a) {}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
