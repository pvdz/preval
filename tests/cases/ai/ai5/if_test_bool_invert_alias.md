# Preval test case

# if_test_bool_invert_alias.md

> Ai > Ai5 > If test bool invert alias
>
> let alias, should fire

## Input

`````js filename=intro
let a = !c;
if (c) {
  $(a);
}

// const alias, should fire
const b = !d;
if (d) {
  $(b);
}

// reassignment, should not fire
let e = !f;
e = true;
if (f) {
  $(e);
}

// different scope, should not fire
let g = !h;
{
  if (h) {
    $(g);
  }
}

// TDZ, should not fire
if (i) {
  $(j);
}
let j = !i;

// closure, should not fire
let k = !l;
function foo() {
  if (l) {
    $(k);
  }
}

// side effect, should not fire
let m = !foo();
if (n) {
  $(m);
}

// non-inverted, should not fire
let o = n;
if (n) {
  $(o);
}

// let alias declared inside branch, should fire
if (p) {
  let q = !p;
  $(q);
}

// const alias declared inside branch, should fire
if (r) {
  const s = !r;
  $(s);
}

// multiple uses after decl, should fire for all
if (t) {
  let u = !t;
  $(u);
  $(u);
}
`````


## Settled


`````js filename=intro
if (c) {
  $(false);
} else {
}
if (d) {
  $(false);
} else {
}
if (f) {
  $(true);
} else {
}
if (h) {
  $(false);
} else {
}
if (i) {
  throw `Preval: TDZ triggered for this read: \$(j)`;
} else {
  if (l) {
    $(false);
  } else {
  }
  if (n) {
    $(true);
  } else {
  }
  const o /*:unknown*/ = n;
  if (n) {
    $(o);
  } else {
  }
  if (p) {
    $(false);
  } else {
  }
  if (r) {
    $(false);
  } else {
  }
  if (t) {
    $(false);
    $(false);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (c) {
  $(false);
}
if (d) {
  $(false);
}
if (f) {
  $(true);
}
if (h) {
  $(false);
}
if (i) {
  throw `Preval: TDZ triggered for this read: \$(j)`;
} else {
  if (l) {
    $(false);
  }
  if (n) {
    $(true);
  }
  const o = n;
  if (n) {
    $(o);
  }
  if (p) {
    $(false);
  }
  if (r) {
    $(false);
  }
  if (t) {
    $(false);
    $(false);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  $( false );
}
if (d) {
  $( false );
}
if (f) {
  $( true );
}
if (h) {
  $( false );
}
if (i) {
  throw "Preval: TDZ triggered for this read: $(j)";
}
else {
  if (l) {
    $( false );
  }
  if (n) {
    $( true );
  }
  const a = n;
  if (n) {
    $( a );
  }
  if (p) {
    $( false );
  }
  if (r) {
    $( false );
  }
  if (t) {
    $( false );
    $( false );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function () {
  debugger;
  if (l) {
    $(k);
    return undefined;
  } else {
    return undefined;
  }
};
let a = !c;
if (c) {
  $(a);
} else {
}
const b = !d;
if (d) {
  $(b);
} else {
}
let e = !f;
e = true;
if (f) {
  $(e);
} else {
}
let g = !h;
if (h) {
  $(g);
} else {
}
if (i) {
  throw `Preval: TDZ triggered for this read: \$(j)`;
} else {
}
let j = !i;
let k = !l;
const tmpUnaryArg = foo();
let m = !tmpUnaryArg;
if (n) {
  $(m);
} else {
}
let o = n;
if (n) {
  $(o);
} else {
}
if (p) {
  let q = false;
  $(q);
} else {
}
if (r) {
  const s = false;
  $(s);
} else {
}
if (t) {
  let u = false;
  $(u);
  $(u);
} else {
}
`````


## Todos triggered


- (todo) fixme: spyless vars and labeled nodes


## Globals


BAD@! Found 10 implicit global bindings:

c, d, f, h, i, l, n, p, r, t


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
