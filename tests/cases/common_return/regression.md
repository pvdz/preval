# Preval test case

# regression.md

> Common return > Regression
>
> This was working at some point and this was broken another point and hopefully when you're reading it it's working again

Note: `g` should be eliminated and inlined into the only call site, `k`

## Input

`````js filename=intro
const k = function () {
  return g($(10));
};
const g = function (x) {
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    return x;
  } else {
    return x;
  }
};
const f = function () {
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    return k();
  } else {
    return k();
  }
};
const h = function () {
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    return f();
  } else {
    return f();
  }
};
$(h());
`````


## Settled


`````js filename=intro
const k /*:()=>unknown*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = $(10);
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    return tmpCalleeParam;
  } else {
    return tmpCalleeParam;
  }
};
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = k();
    $(tmpClusterSSA_tmpCalleeParam$1);
  } else {
    const tmpClusterSSA_tmpCalleeParam$2 /*:unknown*/ = k();
    $(tmpClusterSSA_tmpCalleeParam$2);
  }
} else {
  const tmpClusterSSA_tmpCalleeParam$4 /*:unknown*/ = k();
  $(tmpClusterSSA_tmpCalleeParam$4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const k = function () {
  const tmpCalleeParam = $(10);
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    return tmpCalleeParam;
  } else {
    return tmpCalleeParam;
  }
};
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    $(k());
  } else {
    $(k());
  }
} else {
  $(k());
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 10 );
  if ($) {
    $( "prevent" );
    $( "simple" );
    $( "inlining" );
    return b;
  }
  else {
    return b;
  }
};
if ($) {
  $( "prevent" );
  $( "simple" );
  $( "inlining" );
  if ($) {
    $( "prevent" );
    $( "simple" );
    $( "inlining" );
    const c = a();
    $( c );
  }
  else {
    const d = a();
    $( d );
  }
}
else {
  const e = a();
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const k = function () {
  debugger;
  const tmpCallCallee = g;
  let tmpCalleeParam = $(10);
  const tmpReturnArg = g(tmpCalleeParam);
  return tmpReturnArg;
};
const g = function ($$0) {
  let x = $$0;
  debugger;
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    return x;
  } else {
    return x;
  }
};
const f = function () {
  debugger;
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    const tmpReturnArg$1 = k();
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$3 = k();
    return tmpReturnArg$3;
  }
};
const h = function () {
  debugger;
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    const tmpReturnArg$5 = f();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = f();
    return tmpReturnArg$7;
  }
};
let tmpCalleeParam$1 = h();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prevent'
 - 2: 'simple'
 - 3: 'inlining'
 - 4: 'prevent'
 - 5: 'simple'
 - 6: 'inlining'
 - 7: 10
 - 8: 'prevent'
 - 9: 'simple'
 - 10: 'inlining'
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
