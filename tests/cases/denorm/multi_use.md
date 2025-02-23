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
  $dotCall(settime, date, endtime);
  a8.expires = date;
  unknown = date;
} else {

}
`````

## Pre Normal


`````js filename=intro
if (expires) {
  const date = new Date();
  const settime = date.setTime;
  const time = date.getTime();
  const exp = expires * 1000;
  const endtime = time + exp;
  $dotCall(settime, date, endtime);
  a8.expires = date;
  unknown = date;
} else {
}
`````

## Normalized


`````js filename=intro
if (expires) {
  const date = new Date();
  const settime = $date_setTime;
  const time = date.getTime();
  const exp = expires * 1000;
  const endtime = time + exp;
  $dotCall(settime, date, endtime);
  a8.expires = date;
  unknown = date;
} else {
}
`````

## Output


`````js filename=intro
if (expires) {
  const date /*:object*/ = new Date();
  const time /*:unknown*/ = date.getTime();
  const exp /*:number*/ = expires * 1000;
  const endtime /*:primitive*/ = time + exp;
  $dotCall($date_setTime, date, endtime);
  a8.expires = date;
  unknown = date;
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if (expires) {
  const a = new Date();
  const b = a.getTime();
  const c = expires * 1000;
  const d = b + c;
  $dotCall( $date_setTime, a, d );
  a8.expires = a;
  unknown = a;
}
`````

## Globals

BAD@! Found 3 implicit global bindings:

expires, a8, unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
