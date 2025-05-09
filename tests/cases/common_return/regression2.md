# Preval test case

# regression2.md

> Common return > Regression2
>
> This was working at some point and this was broken another point and hopefully when you're reading it it's working again

Note: `d` should be eliminated and inlined into the only call site, `c`

## Input

`````js filename=intro
const d = function (x) {
  if ($) {
    $('d');
    return x;
  } else {
    return x;
  }
};
const c = function () {
  $('c');
  return d($(10));
};
const b = function () {
  if ($) {
    $('b');
    return c();
  } else {
    return c();
  }
};
const a = function () {
  if ($) {
    $('a');
    return b();
  } else {
    return b();
  }
};
$(a());
`````


## Settled


`````js filename=intro
const c /*:()=>unknown*/ = function () {
  debugger;
  $(`c`);
  const tmpCalleeParam /*:unknown*/ = $(10);
  if ($) {
    $(`d`);
    return tmpCalleeParam;
  } else {
    return tmpCalleeParam;
  }
};
if ($) {
  $(`a`);
  if ($) {
    $(`b`);
    const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = c();
    $(tmpClusterSSA_tmpCalleeParam$1);
  } else {
    const tmpClusterSSA_tmpCalleeParam$2 /*:unknown*/ = c();
    $(tmpClusterSSA_tmpCalleeParam$2);
  }
} else {
  const tmpClusterSSA_tmpCalleeParam$4 /*:unknown*/ = c();
  $(tmpClusterSSA_tmpCalleeParam$4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = function () {
  $(`c`);
  const tmpCalleeParam = $(10);
  if ($) {
    $(`d`);
    return tmpCalleeParam;
  } else {
    return tmpCalleeParam;
  }
};
if ($) {
  $(`a`);
  if ($) {
    $(`b`);
    $(c());
  } else {
    $(c());
  }
} else {
  $(c());
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "c" );
  const b = $( 10 );
  if ($) {
    $( "d" );
    return b;
  }
  else {
    return b;
  }
};
if ($) {
  $( "a" );
  if ($) {
    $( "b" );
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 10
 - 5: 'd'
 - 6: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
