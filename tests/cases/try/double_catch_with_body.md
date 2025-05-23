# Preval test case

# double_catch_with_body.md

> Try > Double catch with body
>
> Nested catches can be squashed

## Input

`````js filename=intro
try {
  try {
    if ($) {
      throw 'pass';
    }
    $('fail');
  } catch (e) {
    $('inner');
  }
} catch (e) {
  $('outer');
}
`````


## Settled


`````js filename=intro
try {
  if ($) {
    throw `pass`;
  } else {
    $(`fail`);
  }
} catch (e) {
  try {
    $(`inner`);
  } catch (e$1) {
    $(`outer`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  if ($) {
    throw `pass`;
  } else {
    $(`fail`);
  }
} catch (e) {
  try {
    $(`inner`);
  } catch (e$1) {
    $(`outer`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  if ($) {
    throw "pass";
  }
  else {
    $( "fail" );
  }
}
catch (a) {
  try {
    $( "inner" );
  }
  catch (b) {
    $( "outer" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  if ($) {
    throw `pass`;
  } else {
    $(`fail`);
  }
} catch (e) {
  try {
    $(`inner`);
  } catch (e$1) {
    $(`outer`);
  }
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
