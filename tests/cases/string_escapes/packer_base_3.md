# Preval test case

# packer_base_3.md

> String escapes > Packer base 3

From https://richosoft2.co.uk/resources/jspack/
This is `console.log('boo')` after Dean's PACKER minifier.

## Input

`````js filename=intro
      let p/*:string*/ = `0.1('2')`;
const r/*:object*/ /*truthy*/ = {[2]:`boo`, [1]:`log`};
let tmpClusterSSA_c$1/*:number*/ = 0;
let tmpAssignComputedRhs$2/*:string*/ /*truthy*/ = `console`;
r[0] = tmpAssignComputedRhs$2;
const k/*:array*/ /*truthy*/ = [`console`, `log`, `boo`];
while ($LOOP_UNROLL_8) {
  const tmpPostUpdArgIdent$1/*:number*/ = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    let tmpAssignComputedRhs$1/*:primitive*/ = k[tmpClusterSSA_c$1];
    if (tmpAssignComputedRhs$1) {

    } else {
      tmpAssignComputedRhs$1 = tmpClusterSSA_c$1;
    }
    r[tmpClusterSSA_c$1] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement/*:(unknown)=>unknown*/ = function($$0) {
  const $dlr_$$0/*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg/*:unknown*/ = r[$dlr_$$0];
  return tmpReturnArg;
};
let tmpClusterSSA_c/*:number*/ = 1;
const tmpClusterSSA_k/*:array*/ /*truthy*/ = [tmpArrElement];
while (true) {
  const tmpPostUpdArgIdent$3/*:number*/ = tmpClusterSSA_c;
  tmpClusterSSA_c = tmpClusterSSA_c - 1;
  if (tmpPostUpdArgIdent$3) {
    const tmpIfTest$5/*:unknown*/ = tmpClusterSSA_k[tmpClusterSSA_c];
    if (tmpIfTest$5) {
      const tmpMCP$1/*:regex*/ /*truthy*/ = new $regex_constructor(`\\b\\w+\\b`, `g`);
      const tmpMCP$3/*:unknown*/ = tmpClusterSSA_k[tmpClusterSSA_c];
      p = $dotCall($string_replace, p, `replace`, tmpMCP$1, tmpMCP$3);
    } else {

    }
  } else {
    break;
  }
}
$(p);



`````


## Settled


`````js filename=intro
$(`console.log('boo')`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`console.log('boo')`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "console.log('boo')" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let p = `0.1('2')`;
const r = { [2]: `boo`, [1]: `log` };
let tmpClusterSSA_c$1 = 0;
let tmpAssignComputedRhs$2 = `console`;
r[0] = tmpAssignComputedRhs$2;
const k = [`console`, `log`, `boo`];
while ($LOOP_UNROLL_8) {
  const tmpPostUpdArgIdent$1 = tmpClusterSSA_c$1;
  tmpClusterSSA_c$1 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    let tmpAssignComputedRhs$1 = k[tmpClusterSSA_c$1];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = tmpClusterSSA_c$1;
    }
    r[tmpClusterSSA_c$1] = tmpAssignComputedRhs$1;
  } else {
    break;
  }
}
const tmpArrElement = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const $dlr_$$1 = $dlr_$$0;
  const tmpReturnArg = r[$dlr_$$1];
  return tmpReturnArg;
};
let tmpClusterSSA_c = 1;
const tmpClusterSSA_k = [tmpArrElement];
while (true) {
  const tmpPostUpdArgIdent$3 = tmpClusterSSA_c;
  tmpClusterSSA_c = tmpClusterSSA_c - 1;
  if (tmpPostUpdArgIdent$3) {
    const tmpIfTest$5 = tmpClusterSSA_k[tmpClusterSSA_c];
    if (tmpIfTest$5) {
      const tmpMCP$1 = new $regex_constructor(`\\b\\w+\\b`, `g`);
      const tmpMCP$3 = tmpClusterSSA_k[tmpClusterSSA_c];
      p = $dotCall($string_replace, p, `replace`, tmpMCP$1, tmpMCP$3);
    } else {
    }
  } else {
    break;
  }
}
$(p);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) can we always safely clone ident refs in this case?
- (todo) objects in isFree check
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: "console.log('boo')"
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
