# Preval test case

# math_with_side_effect_getter.md

> Math > Ai > Math with side effect getter
>
> Math.abs with object with getter side effect

## Input

`````js filename=intro
let triggered = false;
const obj = { get valueOf() { triggered = true; return -7; } };
const a = $(Math.abs(obj));
$(a);
$(triggered);
// Should be 7, true
`````


## Settled


`````js filename=intro
let triggered /*:boolean*/ = false;
const obj /*:object*/ /*truthy*/ = {
  get valueOf() {
    debugger;
    triggered = true;
    return -7;
  },
};
const tmpCalleeParam /*:number*/ = $Math_abs(obj);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
$(triggered);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let triggered = false;
$(
  $(
    $Math_abs({
      get valueOf() {
        triggered = true;
        return -7;
      },
    }),
  ),
);
$(triggered);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = false;
const b = { get valueOf() {
  debugger;
  a = true;
  return -7;
} };
const c = $Math_abs( b );
const d = $( c );
$( d );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let triggered = false;
const obj = {
  get valueOf() {
    debugger;
    triggered = true;
    return -7;
  },
};
const tmpMCF = $Math_abs;
let tmpCalleeParam = $Math_abs(obj);
const a = $(tmpCalleeParam);
$(a);
$(triggered);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
