# Preval test case

# try_catch_finally.md

> Unroll loop with true > Try catch finally
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
while (true) {
  try {
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else {
      $('third');
    }
  } catch (e) {
    $('error', e);
  } finally {
    $('finally');
  }
}
`````


## Settled


`````js filename=intro
let $finalStep /*:boolean*/ = false;
try {
  const test /*:unknown*/ = $(`first`);
  $(`second`);
  if (test) {
    $finalStep = true;
  } else {
    $(`third`);
  }
} catch (e) {
  try {
    $(`error`, e);
  } catch ($finalImplicit) {
    $(`finally`);
    throw $finalImplicit;
  }
}
$(`finally`);
if ($finalStep) {
} else {
  while ($LOOP_UNROLL_10) {
    let $finalStep$1 /*:boolean*/ = false;
    try {
      const test$1 /*:unknown*/ = $(`first`);
      $(`second`);
      if (test$1) {
        $finalStep$1 = true;
      } else {
        $(`third`);
      }
    } catch (e$3) {
      try {
        $(`error`, e$3);
      } catch ($finalImplicit$1) {
        $(`finally`);
        throw $finalImplicit$1;
      }
    }
    $(`finally`);
    if ($finalStep$1) {
      break;
    } else {
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let $finalStep = false;
try {
  const test = $(`first`);
  $(`second`);
  if (test) {
    $finalStep = true;
  } else {
    $(`third`);
  }
} catch (e) {
  try {
    $(`error`, e);
  } catch ($finalImplicit) {
    $(`finally`);
    throw $finalImplicit;
  }
}
$(`finally`);
if (!$finalStep) {
  while (true) {
    let $finalStep$1 = false;
    try {
      const test$1 = $(`first`);
      $(`second`);
      if (test$1) {
        $finalStep$1 = true;
      } else {
        $(`third`);
      }
    } catch (e$3) {
      try {
        $(`error`, e$3);
      } catch ($finalImplicit$1) {
        $(`finally`);
        throw $finalImplicit$1;
      }
    }
    $(`finally`);
    if ($finalStep$1) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = false;
try {
  const b = $( "first" );
  $( "second" );
  if (b) {
    a = true;
  }
  else {
    $( "third" );
  }
}
catch (c) {
  try {
    $( "error", c );
  }
  catch (d) {
    $( "finally" );
    throw d;
  }
}
$( "finally" );
if (a) {

}
else {
  while ($LOOP_UNROLL_10) {
    let e = false;
    try {
      const f = $( "first" );
      $( "second" );
      if (f) {
        e = true;
      }
      else {
        $( "third" );
      }
    }
    catch (g) {
      try {
        $( "error", g );
      }
      catch (h) {
        $( "finally" );
        throw h;
      }
    }
    $( "finally" );
    if (e) {
      break;
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      const test = $(`first`);
      $(`second`);
      if (test) {
        $finalStep = true;
        break $finally;
      } else {
        $(`third`);
      }
    } catch (e) {
      try {
        $(`error`, e);
      } catch ($finalImplicit) {
        $(`finally`);
        throw $finalImplicit;
      }
    }
  }
  $(`finally`);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      break;
    } else {
    }
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement
- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - 3: 'finally'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
