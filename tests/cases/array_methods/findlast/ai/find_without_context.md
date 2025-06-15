# Preval test case

# find_without_context.md

> Array methods > Findlast > Ai > Find without context
>
> Test: Array.findLast without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].findLast(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpArrnow /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, 3, 2, tmpMCOO);
if (tmpArrnow) {
  $(result, 3);
} else {
  let tmpArreout /*:unknown*/ = undefined;
  let tmpClusterSSA_tmpArri /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri >= 0;
    if (tmpArrc$1) {
      const tmpArrel$1 /*:primitive*/ = tmpMCOO[tmpClusterSSA_tmpArri];
      const tmpArrnow$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO);
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
  $(result, tmpArreout);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
const tmpMCOO = [1, 2, 3];
if ($dotCall(tmpMCP, undefined, undefined, 3, 2, tmpMCOO)) {
  $(result, 3);
} else {
  let tmpArreout = undefined;
  let tmpClusterSSA_tmpArri = 1;
  while (true) {
    if (tmpClusterSSA_tmpArri >= 0) {
      const tmpArrel$1 = tmpMCOO[tmpClusterSSA_tmpArri];
      if ($dotCall(tmpMCP, undefined, undefined, tmpArrel$1, tmpClusterSSA_tmpArri, tmpMCOO)) {
        tmpArreout = tmpArrel$1;
        break;
      } else {
        tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri - 1;
      }
    } else {
      break;
    }
  }
  $(result, tmpArreout);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function($$0 ) {
  const c = this;
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = [ 1, 2, 3 ];
const f = $dotCall( b, undefined, undefined, 3, 2, e );
if (f) {
  $( a, 3 );
}
else {
  let g = undefined;
  let h = 1;
  while ($LOOP_UNROLL_10) {
    const i = h >= 0;
    if (i) {
      const j = e[ h ];
      const k = $dotCall( b, undefined, undefined, j, h, e );
      if (k) {
        g = j;
        break;
      }
      else {
        h = h - 1;
      }
    }
    else {
      break;
    }
  }
  $( a, g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.findLast;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findLast`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findLast


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true, true], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
