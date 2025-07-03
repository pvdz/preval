# Preval test case

# spy_on_assign_pre.md

> Incdec > Inc > Spy on assign pre

## Input

`````js filename=intro
let c = {valueOf: () => { $('c flag now:', flag); }};
let flag = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (flag < 10) {
    flag = ++c;
    $('++c', flag);
  } else {
    break;
  }
}
$(c, flag);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  debugger;
  $(`c flag now:`, flag);
  return undefined;
};
let c /*:unknown*/ = { valueOf: tmpObjLitVal };
let flag /*:unknown*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:boolean*/ = flag < 10;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent /*:number*/ = $coerce(c, `number`);
    c = tmpPostUpdArgIdent + 1;
    flag = c;
    $(`++c`, c);
  } else {
    break;
  }
}
$(c, flag);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function () {
  $(`c flag now:`, flag);
};
let c = { valueOf: tmpObjLitVal };
let flag = 0;
while (true) {
  if (flag < 10) {
    c = Number(c) + 1;
    flag = c;
    $(`++c`, c);
  } else {
    break;
  }
}
$(c, flag);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "c flag now:", b );
  return undefined;
};
let c = { valueOf: a };
let b = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b < 10;
  if (d) {
    const e = $coerce( c, "number" );
    c = e + 1;
    b = c;
    $( "++c", c );
  }
  else {
    break;
  }
}
$( c, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  $(`c flag now:`, flag);
  return undefined;
};
let c = { valueOf: tmpObjLitVal };
let flag = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest = flag < 10;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent = $coerce(c, `number`);
    c = tmpPostUpdArgIdent + 1;
    flag = c;
    $(`++c`, c);
  } else {
    break;
  }
}
$(c, flag);
`````


## Todos triggered


- (todo) Support non-primitive in first arg to $coerce
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c flag now:', 0
 - 2: '++c', NaN
 - 3: NaN, NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
