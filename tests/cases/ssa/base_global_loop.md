# Preval test case

# base_global_loop.md

> Ssa > Base global loop
>
> Contrived example

## Input

`````js filename=intro
let x = $(3);
$(x);
while (true) {
  $(++x);
  if (x > 5) break;
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(3);
$(x);
const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
let tmpClusterSSA_x /*:number*/ = tmpPostUpdArgIdent + 1;
$(tmpClusterSSA_x);
const tmpIfTest /*:boolean*/ = tmpClusterSSA_x > 5;
if (tmpIfTest) {
  $(tmpClusterSSA_x);
} else {
  while ($LOOP_UNROLLS_LEFT_10) {
    tmpClusterSSA_x = tmpClusterSSA_x + 1;
    $(tmpClusterSSA_x);
    const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_x > 5;
    if (tmpIfTest$1) {
      break;
    } else {
    }
  }
  $(tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(3);
$(x);
let tmpClusterSSA_x = Number(x) + 1;
$(tmpClusterSSA_x);
if (tmpClusterSSA_x > 5) {
  $(tmpClusterSSA_x);
} else {
  while (true) {
    tmpClusterSSA_x = tmpClusterSSA_x + 1;
    $(tmpClusterSSA_x);
    if (tmpClusterSSA_x > 5) {
      break;
    }
  }
  $(tmpClusterSSA_x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
$( a );
const b = $coerce( a, "number" );
let c = b + 1;
$( c );
const d = c > 5;
if (d) {
  $( c );
}
else {
  while ($LOOP_UNROLLS_LEFT_10) {
    c = c + 1;
    $( c );
    const e = c > 5;
    if (e) {
      break;
    }
  }
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(3);
$(x);
while (true) {
  const tmpPostUpdArgIdent = $coerce(x, `number`);
  x = tmpPostUpdArgIdent + 1;
  let tmpCalleeParam = x;
  $(x);
  const tmpIfTest = x > 5;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(x);
`````


## Todos triggered


- (todo) Support non-primitive in first arg to $coerce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
