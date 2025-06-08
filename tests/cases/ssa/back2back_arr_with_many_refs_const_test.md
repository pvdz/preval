# Preval test case

# back2back_arr_with_many_refs_const_test.md

> Ssa > Back2back arr with many refs const test
>
> Silly case but trying to catch something on a generic level; a double assign where the rhs contains multiple references.
> This builds out on another test by making the test condition (abc) a constant. The second occurrence should then be eliminated in the final output.

## Input

`````js filename=intro
// At the time of writing, this const will be replaced by $ but that means it can't eliminate
// the second "if" because "$" is an unknown binding. So there's some fixing to be done there when inlining.
const abc = $;
function f() {
  if (abc) {
    let x = $(undefined);
    // This assign should be SSA but all the refs in the rhs must keep the same name
    x = [1, x, 2, x, 3, x, 4, x];
    abc(x);
    // This bit prevents other optimizations from eliminating the above entirely immediately
    const g = function(){
      // In the final output, this "if" can be dropped because it will be tested already and is a constant
      if (abc) abc(x);
    };
    g();
  }
}
if (abc) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(undefined);
  const tmpSSA_x /*:array*/ /*truthy*/ = [1, x, 2, x, 3, x, 4, x];
  $(tmpSSA_x);
  if ($) {
    $(tmpSSA_x);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(undefined);
  const tmpSSA_x = [1, x, 2, x, 3, x, 4, x];
  $(tmpSSA_x);
  if ($) {
    $(tmpSSA_x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( undefined );
  const b = [ 1, a, 2, a, 3, a, 4, a ];
  $( b );
  if ($) {
    $( b );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if (abc) {
    let x = $(undefined);
    x = [1, x, 2, x, 3, x, 4, x];
    abc(x);
    const g = function () {
      debugger;
      if (abc) {
        abc(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    g();
    return undefined;
  } else {
    return undefined;
  }
};
const abc = $;
if (abc) {
  f();
} else {
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: [1, undefined, 2, undefined, 3, undefined, 4, undefined]
 - 3: [1, undefined, 2, undefined, 3, undefined, 4, undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
