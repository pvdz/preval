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
  const date /*:object*/ = new Date();
  const time /*:unknown*/ = date.getTime();
  const exp /*:number*/ = expires * 1000;
  const endtime /*:primitive*/ = time + exp;
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
  const date = new Date();
  const time = date.getTime();
  $dotCall($date_setTime, date, `setTime`, time + expires * 1000);
  a8.expires = date;
  unknown = date;
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (expires) {
  const a = new Date();
  const b = a.getTime();
  const c = expires * 1000;
  const d = b + c;
  $dotCall( $date_setTime, a, "setTime", d );
  a8.expires = a;
  unknown = a;
}
`````


## Todos triggered


- maybe fix the type for calling this builtin?
- Missed opportunity to inline a type tracked trick for


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
