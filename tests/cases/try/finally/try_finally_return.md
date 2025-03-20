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
