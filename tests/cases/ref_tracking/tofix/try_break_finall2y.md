# Preval test case

# try_break_finall2y.md

> Ref tracking > Tofix > Try break finall2y
>
> a break trapped by a finally still continues to the break target afterwards (the finally does override it if it would)

## Input

`````js filename=intro
foo: {
  let x = 1;
  abc: try {
    break foo;
  } finally {
    x = 2;
  }

  $(x);
  x = 3;
}
$(x); // x can be 1 or 2 but not 3. we can cover this.
`````


## Settled


`````js filename=intro
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
foo: {
  let x$1 = 1;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $finalStep = true;
      break $finally;
    } catch ($finalImplicit) {
      x$1 = 2;
      throw $finalImplicit;
    }
  }
  x$1 = 2;
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    break foo;
  }
}
$(x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
