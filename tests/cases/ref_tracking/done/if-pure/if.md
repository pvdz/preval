# Preval test case

# if.md

> Ref tracking > Done > If-pure > If
>
> base

## Input

`````js filename=intro
// before  if   else   after
// -, w, wr
// -, r, rw, w, wr, rwr, wrw
// -, r, rw, w, wr, rwr, wrw
// -, r, w

{
  let x = 1;
  if ($) {
    $(x, 2);
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
    $(x, 2);
  } else {
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
  } else {
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
    $(x, 2);
    x = 10;
    $(x);
  } else {
    $(x, 3);
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
  } else {
    $(x, 2);
    x = 10;
    $(x, 3);
  }
  x = 4;
  $(x);
}

{
  let x = 1;
  if ($) {
    $(x, 2);
    x = 10;
    $(x, 3);
  } else {
    $(x, 4);
    x = 10;
    $(x, 5);
  }
  x = 4;
  $(x);
}
`````


## Settled


`````js filename=intro
if ($) {
  $(1, 2);
  $(4);
} else {
  $(1, 3);
  $(4);
}
if ($) {
  $(1, 2);
  $(4);
} else {
  $(4);
}
if ($) {
  $(4);
  $(4);
} else {
  $(1, 3);
  $(4);
  $(4);
}
if ($) {
  $(1, 2);
  $(10);
  $(4);
} else {
  $(1, 3);
  $(4);
}
if ($) {
  $(4);
} else {
  $(1, 2);
  $(10, 3);
  $(4);
}
if ($) {
  $(1, 2);
  $(10, 3);
  $(4);
} else {
  $(1, 4);
  $(10, 5);
  $(4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1, 2);
  $(4);
} else {
  $(1, 3);
  $(4);
}
if ($) {
  $(1, 2);
  $(4);
} else {
  $(4);
}
if ($) {
  $(4);
  $(4);
} else {
  $(1, 3);
  $(4);
  $(4);
}
if ($) {
  $(1, 2);
  $(10);
  $(4);
} else {
  $(1, 3);
  $(4);
}
if ($) {
  $(4);
} else {
  $(1, 2);
  $(10, 3);
  $(4);
}
if ($) {
  $(1, 2);
  $(10, 3);
  $(4);
} else {
  $(1, 4);
  $(10, 5);
  $(4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1, 2 );
  $( 4 );
}
else {
  $( 1, 3 );
  $( 4 );
}
if ($) {
  $( 1, 2 );
  $( 4 );
}
else {
  $( 4 );
}
if ($) {
  $( 4 );
  $( 4 );
}
else {
  $( 1, 3 );
  $( 4 );
  $( 4 );
}
if ($) {
  $( 1, 2 );
  $( 10 );
  $( 4 );
}
else {
  $( 1, 3 );
  $( 4 );
}
if ($) {
  $( 4 );
}
else {
  $( 1, 2 );
  $( 10, 3 );
  $( 4 );
}
if ($) {
  $( 1, 2 );
  $( 10, 3 );
  $( 4 );
}
else {
  $( 1, 4 );
  $( 10, 5 );
  $( 4 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2
 - 2: 4
 - 3: 1, 2
 - 4: 4
 - 5: 4
 - 6: 4
 - 7: 1, 2
 - 8: 10
 - 9: 4
 - 10: 4
 - 11: 1, 2
 - 12: 10, 3
 - 13: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
