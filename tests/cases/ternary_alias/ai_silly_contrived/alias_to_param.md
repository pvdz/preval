# Preval test case

# alias_to_param.md

> Ternary alias > Ai silly contrived > Alias to param
>
> b assigned to a function parameter: should NOT replace

## Options

- globals: x

## Input

`````js filename=intro
function f(a) {
  let b = undefined;
  if (x) {} else { b = a; }
  $(b);
}
$(f());
// Expect: No change, b is not a local alias
`````


## Settled


`````js filename=intro
x;
$(undefined);
$(undefined);
x;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$(undefined);
$(undefined);
x;
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( undefined );
$( undefined );
x;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  let b = undefined;
  if (x) {
    $(b);
    return undefined;
  } else {
    b = a;
    $(a);
    return undefined;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
