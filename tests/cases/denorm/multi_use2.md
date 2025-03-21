# Preval test case

# multi_use2.md

> Denorm > Multi use2
>
> Bug caused date to get lost. Was not properly checking if var was only used once.

## Input

`````js filename=intro
if (expires) {
  const date = new Date();
  const time = date.getTime();
  $(time)
  unknown = date;
} else {

}
`````


## Settled


`````js filename=intro
if (expires) {
  const date /*:object*/ = new Date();
  const time /*:unknown*/ = date.getTime();
  $(time);
  unknown = date;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (expires) {
  const date = new Date();
  $(date.getTime());
  unknown = date;
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (expires) {
  const a = new Date();
  const b = a.getTime();
  $( b );
  unknown = a;
}
`````


## Todos triggered


- (todo) maybe fix the type for calling builtin $date_getTime


## Globals


BAD@! Found 2 implicit global bindings:

expires, unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
