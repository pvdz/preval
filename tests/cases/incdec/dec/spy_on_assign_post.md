# Preval test case

# spy_on_assign_post.md

> Incdec > Dec > Spy on assign post

## Input

`````js filename=intro
let d = {valueOf: () => { $('d flag now:', flag); }};
let flag = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (flag < 10) {
    flag = d--;
    $('d--', flag);
  } else {
    break;
  }
}
$(d, flag);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  debugger;
  $(`d flag now:`, flag);
  return undefined;
};
let d /*:unknown*/ = { valueOf: tmpObjLitVal };
let flag /*:unknown*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:boolean*/ = flag < 10;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent /*:number*/ = $coerce(d, `number`);
    d = tmpPostUpdArgIdent - 1;
    flag = tmpPostUpdArgIdent;
    $(`d--`, tmpPostUpdArgIdent);
  } else {
    break;
  }
}
$(d, flag);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function () {
  $(`d flag now:`, flag);
};
let d = { valueOf: tmpObjLitVal };
let flag = 0;
while (true) {
  if (flag < 10) {
    const tmpPostUpdArgIdent = $coerce(d, `number`);
    d = tmpPostUpdArgIdent - 1;
    flag = tmpPostUpdArgIdent;
    $(`d--`, tmpPostUpdArgIdent);
  } else {
    break;
  }
}
$(d, flag);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "d flag now:", b );
  return undefined;
};
let c = { valueOf: a };
let b = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b < 10;
  if (d) {
    const e = $coerce( c, "number" );
    c = e - 1;
    b = e;
    $( "d--", e );
  }
  else {
    break;
  }
}
$( c, b );
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) Support non-primitive in first arg to $coerce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'd flag now:', 0
 - 2: 'd--', NaN
 - 3: NaN, NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
