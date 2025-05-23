# Preval test case

# _base_with_and_without_arg.md

> Normalize > Defaults > Base with and without arg
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````


## Settled


`````js filename=intro
$(`x`);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x" );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = `foo`;
    return a;
  } else {
    a = tmpParamBare;
    return a;
  }
};
let tmpCalleeParam = f(`x`);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
