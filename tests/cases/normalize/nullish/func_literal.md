# Preval test case

# func_literal.md

> Normalize > Nullish > Func literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'??length);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(`foo`);
$(tmpClusterSSA_tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`foo`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = `foo`;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = length;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
