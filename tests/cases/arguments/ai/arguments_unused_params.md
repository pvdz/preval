# Preval test case

# arguments_unused_params.md

> Arguments > Ai > Arguments unused params
>
> Test unused parameters with arguments access

## Input

`````js filename=intro
function testUnusedParams(unused1, a, unused2, b, unused3) {
  const len = arguments.length;
  const first = arguments[0];
  const second = arguments[1];
  const third = arguments[2];
  const fourth = arguments[3];
  const fifth = arguments[4];
  $(len, first, second, third, fourth, fifth, a, b);
}

testUnusedParams('x', 'y', 'z', 'w', 'v');
`````


## Settled


`````js filename=intro
$(5, `x`, `y`, `z`, `w`, `v`, `y`, `w`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5, `x`, `y`, `z`, `w`, `v`, `y`, `w`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5, "x", "y", "z", "w", "v", "y", "w" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testUnusedParams = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let unused1 = $$0;
  let a = $$1;
  let unused2 = $$2;
  let b = $$3;
  let unused3 = $$4;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  const first = tmpPrevalAliasArgumentsAny[0];
  const second = tmpPrevalAliasArgumentsAny[1];
  const third = tmpPrevalAliasArgumentsAny[2];
  const fourth = tmpPrevalAliasArgumentsAny[3];
  const fifth = tmpPrevalAliasArgumentsAny[4];
  $(len, first, second, third, fourth, fifth, a, b);
  return undefined;
};
testUnusedParams(`x`, `y`, `z`, `w`, `v`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5, 'x', 'y', 'z', 'w', 'v', 'y', 'w'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
