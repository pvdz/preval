# Preval test case

# try.md

> Function splitting > Try
>
> A function that tests on a param and has two separate code paths based on that test might be splittable if we know all the args.

This exception was specifically aimed towards an obfuscator

## Input

`````js filename=intro
function f(a) {
  try {
    if (a) {
      $('then');
    } else {
      $('else');
    }
  } catch {}
}

f(0);
f('ok');
f(true);
f(false);
`````


## Settled


`````js filename=intro
const tmpSplitTruthy /*:()=>unknown*/ = function () {
  debugger;
  try {
    $(`then`);
  } catch (tmpCatchParam) {}
  return undefined;
};
const tmpSplitFalsy /*:()=>unknown*/ = function () {
  debugger;
  try {
    $(`else`);
  } catch (tmpCatchParam$1) {}
  return undefined;
};
tmpSplitFalsy();
tmpSplitTruthy();
tmpSplitTruthy();
tmpSplitFalsy();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSplitTruthy = function () {
  try {
    $(`then`);
  } catch (tmpCatchParam) {}
};
const tmpSplitFalsy = function () {
  try {
    $(`else`);
  } catch (tmpCatchParam$1) {}
};
tmpSplitFalsy();
tmpSplitTruthy();
tmpSplitTruthy();
tmpSplitFalsy();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  try {
    $( "then" );
  }
  catch (b) {

  }
  return undefined;
};
const c = function() {
  debugger;
  try {
    $( "else" );
  }
  catch (d) {

  }
  return undefined;
};
c();
a();
a();
c();
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'else'
 - 2: 'then'
 - 3: 'then'
 - 4: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
