# Preval test case

# implicit_assign_inv_false.md

> If test folding > Implicit assign inv false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Options

- globals: x

## Input

`````js filename=intro
function f() {
  let y = undefined;
  if (x) {
    y = true;
  } else {
    y = false;
  }
  $('block'); // Prevent the assignments from getting inlined
  $('block');
  return y;
}
f();
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  $(`block`);
  $(`block`);
  const tmpBool /*:boolean*/ = $boolean_constructor(x);
  return tmpBool;
};
f();
const tmpCalleeParam /*:boolean*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`block`);
  $(`block`);
  const tmpBool = $boolean_constructor(x);
  return tmpBool;
};
f();
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "block" );
  $( "block" );
  const b = $boolean_constructor( x );
  return b;
};
a();
const c = a();
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  if (x) {
    y = true;
    $(`block`);
    $(`block`);
    return y;
  } else {
    y = false;
    $(`block`);
    $(`block`);
    return y;
  }
};
f();
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !1: 'block'
 - !2: 'block'
 - !eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - !1: 'block'
 - !2: 'block'
 - !eval returned: ('<crash[ <ref> is not defined ]>')
