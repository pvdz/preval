# Preval test case

# try_yes_catch_no.md

> Ref tracking > Last write analysis > Try yes catch no
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
// Can rename this write since only the next read can observe it
const oops = function(){ if ($) throw "oops"; };
let x = $('a');
$(x);
// Can not SSA this
x = $('b');
try {
  x = $('c');
} catch {
  $('fail');
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
let tmpClusterSSA_x /*:unknown*/ = $(`b`);
try {
  tmpClusterSSA_x = $(`c`);
} catch (e) {
  $(`fail`);
}
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
let tmpClusterSSA_x = $(`b`);
try {
  tmpClusterSSA_x = $(`c`);
} catch (e) {
  $(`fail`);
}
$(tmpClusterSSA_x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
let b = $( "b" );
try {
  b = $( "c" );
}
catch (c) {
  $( "fail" );
}
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const oops = function () {
  debugger;
  if ($) {
    throw `oops`;
  } else {
    return undefined;
  }
};
let x = $(`a`);
$(x);
x = $(`b`);
try {
  x = $(`c`);
} catch (e) {
  $(`fail`);
}
$(x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'c'
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
