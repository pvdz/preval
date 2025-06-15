# Preval test case

# find_this_primitive.md

> Array methods > Findlast > Ai > Find this primitive
>
> Test: Array.findLast with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].findLast(function(x) { $(this === 42); }, 42);
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpArrnow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, 3, 2, tmpMCOO);
if (tmpArrnow) {
  $(3);
} else {
  let tmpArreout /*:unknown*/ = undefined;
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri >= 0;
    if (tmpArrc$1) {
      const tmpArrel$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpArri];
      const tmpArrnow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO);
      if (tmpArrnow$1) {
        tmpArreout = tmpArrel$1;
        break;
      } else {
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri - 1;
      }
    } else {
      break;
    }
  }
  $(tmpArreout);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
const tmpMCOO = [1, 2, 3];
if ($dotCall(tmpMCP, 42, undefined, 3, 2, tmpMCOO)) {
  $(3);
} else {
  let tmpArreout = undefined;
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri >= 0) {
      const tmpArrel$1 = tmpMCOO[tmpClusterSSA_tmpArri];
      if ($dotCall(tmpMCP, 42, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO)) {
        tmpArreout = tmpArrel$1;
        break;
      } else {
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri - 1;
      }
    } else {
      break;
    }
  }
  $(tmpArreout);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
const d = [ 1, 2, 3 ];
const e = $dotCall( a, 42, undefined, 3, 2, d );
if (e) {
  $( 3 );
}
else {
  let f = undefined;
  let g = 1;
  while ($LOOP_UNROLL_10) {
    const h = g >= 0;
    if (h) {
      const i = d[ g ];
      const j = $dotCall( a, 42, undefined, i, g, d );
      if (j) {
        f = i;
        break;
      }
      else {
        g = g - 1;
      }
    }
    else {
      break;
    }
  }
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.findLast;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findLast`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findLast


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
