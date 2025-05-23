# Preval test case

# try_finally_return.md

> Try > Finally > Try finally return
>
> Finally transform checks

## Input

`````js filename=intro
function f() {
  try {
    return 'exit';
  } finally {
    $(2);
  }
}
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(2);
  return `exit`;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  $(2);
  return `exit`;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 2 );
  return "exit";
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      $finalStep = true;
      $finalArg = `exit`;
      break $finally;
    } catch ($finalImplicit) {
      $(2);
      throw $finalImplicit;
    }
  }
  $(2);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    return $finalArg;
  }
};
$(f);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
