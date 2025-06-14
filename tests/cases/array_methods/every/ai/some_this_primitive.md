# Preval test case

# some_this_primitive.md

> Array methods > Every > Ai > Some this primitive
>
> Test: Array.every with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].every(function(x) { $(this === 42); }, 42);
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
  let tmpArreout /*:boolean*/ = true;
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
    if (tmpArrc$1) {
      const tmpArrin$1 /*:boolean*/ = tmpClusterSSA_tmpArri in tmpMCOO;
      if (tmpArrin$1) {
        const tmpArrel$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpArri];
        const tmpArrenow$1 /*:unknown*/ = $dotCall(tmpMCP, 42, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO);
        if (tmpArrenow$1) {
        } else {
          tmpArreout = false;
          break;
        }
      } else {
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
  $(tmpArreout);
} else {
  $(false);
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
  let tmpArreout = true;
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri < 3) {
      if (tmpClusterSSA_tmpArri in tmpMCOO) {
        if (!$dotCall(tmpMCP, 42, undefined, tmpMCOO[tmpClusterSSA_tmpArri], tmpClusterSSA_tmpArri, tmpMCOO)) {
          tmpArreout = false;
          break;
        }
      }
      tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
    } else {
      break;
    }
  }
  $(tmpArreout);
} else {
  $(false);
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
  let f = true;
  let g = 1;
  while ($LOOP_UNROLL_10) {
    const h = g < 3;
    if (h) {
      const i = g in d;
      if (i) {
        const j = d[ g ];
        const k = $dotCall( a, 42, undefined, j, g, d );
        if (k) {

        }
        else {
          f = false;
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
else {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.every;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `every`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
