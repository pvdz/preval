# Preval test case

# base2.md

> Let if while x > Base2
>
> An abstracted way of doing a boolean check
> 
>

## Input

`````js filename=intro
let n = 0;
let flag = true;
$('before');

const x = $("what");
if (x) {
} else {
  flag = false;
}
while (flag) {
  $('inner', n);
  
  ++n;
  if (n >= 5) {
    flag = false;
  } else {
  }
}
$('after');
$(x);
`````


## Settled


`````js filename=intro
$(`before`);
const x /*:unknown*/ = $(`what`);
if (x) {
  let flag /*:boolean*/ = true;
  $(`inner`, 0);
  let tmpClusterSSA_n /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    if (flag) {
      $(`inner`, tmpClusterSSA_n);
      tmpClusterSSA_n = tmpClusterSSA_n + 1;
      const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_n >= 5;
      if (tmpIfTest$1) {
        flag = false;
      } else {
      }
    } else {
      break;
    }
  }
  $(`after`);
  $(x);
} else {
  $(`after`);
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
const x = $(`what`);
if (x) {
  let flag = true;
  $(`inner`, 0);
  let tmpClusterSSA_n = 1;
  while (true) {
    if (flag) {
      $(`inner`, tmpClusterSSA_n);
      tmpClusterSSA_n = tmpClusterSSA_n + 1;
      if (tmpClusterSSA_n >= 5) {
        flag = false;
      }
    } else {
      break;
    }
  }
  $(`after`);
  $(x);
} else {
  $(`after`);
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
const a = $( "what" );
if (a) {
  let b = true;
  $( "inner", 0 );
  let c = 1;
  while ($LOOP_UNROLL_10) {
    if (b) {
      $( "inner", c );
      c = c + 1;
      const d = c >= 5;
      if (d) {
        b = false;
      }
    }
    else {
      break;
    }
  }
  $( "after" );
  $( a );
}
else {
  $( "after" );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const x = $(`what`);
if (x) {
} else {
  flag = false;
}
while (true) {
  if (flag) {
    $(`inner`, n);
    const tmpPostUpdArgIdent = $coerce(n, `number`);
    n = tmpPostUpdArgIdent + 1;
    const tmpIfTest = n >= 5;
    if (tmpIfTest) {
      flag = false;
    } else {
    }
  } else {
    break;
  }
}
$(`after`);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before'
 - 2: 'what'
 - 3: 'inner', 0
 - 4: 'inner', 1
 - 5: 'inner', 2
 - 6: 'inner', 3
 - 7: 'inner', 4
 - 8: 'after'
 - 9: 'what'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
