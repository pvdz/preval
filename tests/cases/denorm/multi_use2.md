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
  const date /*:date*/ /*truthy*/ = new $date_constructor();
  const time /*:number*/ = $dotCall($date_getTime, date, `getTime`);
  $(time);
  unknown = date;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (expires) {
  const date = new $date_constructor();
  $($dotCall($date_getTime, date, `getTime`));
  unknown = date;
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (expires) {
  const a = new $date_constructor();
  const b = $dotCall( $date_getTime, a, "getTime" );
  $( b );
  unknown = a;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if (expires) {
  const date = new $date_constructor();
  const tmpMCF = $date_getTime;
  const time = $dotCall($date_getTime, date, `getTime`);
  $(time);
  unknown = date;
} else {
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $date_getTime


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
