# Preval test case

# some_this_primitive.md

> Array methods > Some > Ai > Some this primitive
>
> Test: Array.some with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].some(function(x) { $(this === 42); }, 42);
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
const tmpArrenow /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO);
if (tmpArrenow) {
  $(true);
} else {
  let tmpArreout /*:boolean*/ = false;
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
    if (tmpArrc$1) {
      const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in tmpMCOO;
      if (tmpArrin$1) {
        const tmpArrel$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpArri];
        const tmpArrenow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO);
        if (tmpArrenow$1) {
          tmpArreout = true;
          break;
        } else {
        }
      } else {
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
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
if ($dotCall(tmpMCP, 42, undefined, 1, 0, tmpMCOO)) {
  $(true);
} else {
  let tmpArreout = false;
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri < 3) {
      if (tmpClusterSSA_tmpArri in tmpMCOO) {
        if ($dotCall(tmpMCP, 42, undefined, tmpMCOO[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, tmpMCOO)) {
          tmpArreout = true;
          break;
        }
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
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
const e = $dotCall( a, 42, undefined, 1, 0, d );
if (e) {
  $( true );
}
else {
  let f = false;
  let g = 1;
  while ($LOOP_UNROLL_10) {
    const h = g < 3;
    if (h) {
      const i = g in d;
      if (i) {
        const j = d[ g ];
        const k = $dotCall( a, 42, undefined, j, g, d );
        if (k) {
          f = true;
          break;
        }
      }
      g = g + 1;
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
const tmpMCF = tmpMCOO.some;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `some`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
