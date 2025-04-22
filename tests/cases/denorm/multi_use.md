# Preval test case

# multi_use.md

> Denorm > Multi use
>
>

## Input

`````js filename=intro
if (expires) {
  const date = new Date();
  const settime = date.setTime;
  const time = date.getTime();
  const exp = expires * 1000;
  const endtime = time + exp;
  $dotCall(settime, date, 'setTime', endtime);
  a8.expires = date;
  unknown = date;
} else {

}
`````


## Settled


`````js filename=intro
if (expires) {
  const date /*:date*/ = new $date_constructor();
  const time /*:number*/ = $dotCall($date_getTime, date, `getTime`);
  const exp /*:number*/ = expires * 1000;
  const endtime /*:number*/ = time + exp;
  $dotCall($date_setTime, date, `setTime`, endtime);
  a8.expires = date;
  unknown = date;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (expires) {
  const date = new $date_constructor();
  const time = $dotCall($date_getTime, date, `getTime`);
  $dotCall($date_setTime, date, `setTime`, time + expires * 1000);
  a8.expires = date;
  unknown = date;
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (expires) {
  const a = new $date_constructor();
  const b = $dotCall( $date_getTime, a, "getTime" );
  const c = expires * 1000;
  const d = b + c;
  $dotCall( $date_setTime, a, "setTime", d );
  a8.expires = a;
  unknown = a;
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $date_getTime
- (todo) type trackeed tricks can possibly support static $date_setTime


## Globals


BAD@! Found 3 implicit global bindings:

expires, a8, unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
