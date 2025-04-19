# Preval test case

# double_catch.md

> Try > Double catch
>
> Nested empty catches can be squashed

## Input

`````js filename=intro
try {
  try {
    if ($) {
      throw 'pass';
    }
    $('fail');
  } catch (e) {
    
  }
} catch (e) {
  $('fail');
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
} catch (e) {}
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
} catch (e) {}
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

}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
