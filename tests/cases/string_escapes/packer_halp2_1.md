# Preval test case

# packer_halp2_1.md

> String escapes > Packer halp2 1
>
> This is the following code packed with Dean's packer (https://richosoft2.co.uk/resources/jspack/)
> 
> ```
> "a\`b\"c\'d\\e\x20f\u0020g${not_expr}h\/i"
> ```
> 
> Encoded twice. Output is encoded again.

## Input

`````js filename=intro
let p/*:string*/ = ``;
let tmpClusterSSA_c$1/*:number*/ = 11;
const $dlr_$$5/*:object*/ /*truthy*/ = {z:`split`};
const $dlr_$$3/*:array*/ /*truthy*/ = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, `function`, undefined, undefined, undefined, `return`, undefined, `String`, `if`, `replace`, `while`, undefined, `10`, undefined, `eval`, `new`, `RegExp`, `x20f`, undefined, `u0020g`, `not_expr`, `split`];
loopStop: {
  const tmpPostUpdArgIdent$1/*:number*/ = tmpClusterSSA_c$1;
  let tmpClusterSSA_c$2/*:unknown*/ = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$1/*:string*/ = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
    let tmpAssignComputedRhs$1/*:primitive*/ = $dlr_$$3[tmpClusterSSA_c$2];
    if (tmpAssignComputedRhs$1) {

    } else {
      tmpAssignComputedRhs$1 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
    }
    $dlr_$$5[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpPostUpdArgIdent$2/*:number*/ = tmpClusterSSA_c$2;
      tmpClusterSSA_c$2 = tmpClusterSSA_c$2 - 1;
      if (tmpPostUpdArgIdent$2) {
        const tmpAssignComMemLhsProp$2/*:string*/ = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
        let tmpAssignComputedRhs$2/*:primitive*/ = $dlr_$$3[tmpClusterSSA_c$2];
        if (tmpAssignComputedRhs$2) {

        } else {
          tmpAssignComputedRhs$2 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
        }
        $dlr_$$5[tmpAssignComMemLhsProp$2] = tmpAssignComputedRhs$2;
      } else {
        break;
      }
    }
  } else {
    break loopStop;
  }
}
const tmpArrElement/*:(unknown)=>unknown*/ = function($$0) {
  const $dlr_$$8/*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1/*:unknown*/ = $dlr_$$5[$dlr_$$8];
  return tmpReturnArg$1;
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
const $dlr_$$5 /*:object*/ /*truthy*/ = { z: `split`, a: `a` };
let tmpClusterSSA_c$2 /*:number*/ = 10;
const $dlr_$$3 /*:array*/ /*truthy*/ = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  `function`,
  undefined,
  undefined,
  undefined,
  `return`,
  undefined,
  `String`,
  `if`,
  `replace`,
  `while`,
  undefined,
  `10`,
  undefined,
  `eval`,
  `new`,
  `RegExp`,
  `x20f`,
  undefined,
  `u0020g`,
  `not_expr`,
  `split`,
];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpPostUpdArgIdent$2 /*:number*/ = tmpClusterSSA_c$2;
  tmpClusterSSA_c$2 = tmpClusterSSA_c$2 - 1;
  if (tmpPostUpdArgIdent$2) {
    const tmpAssignComMemLhsProp$2 /*:string*/ = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
    let tmpAssignComputedRhs$2 /*:primitive*/ = $dlr_$$3[tmpClusterSSA_c$2];
    if (tmpAssignComputedRhs$2) {
    } else {
      tmpAssignComputedRhs$2 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
    }
    $dlr_$$5[tmpAssignComMemLhsProp$2] = tmpAssignComputedRhs$2;
  } else {
    break;
  }
}
const tmpArrElement /*:(unknown)=>unknown*/ = function ($$0) {
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $dlr_$$5[$dlr_$$0];
  return tmpReturnArg$1;
};
const tmpMCP$1 /*:regex*/ /*truthy*/ = new $regex_constructor(`\\b\\w+\\b`, `g`);
const tmpClusterSSA_p /*:string*/ = $dotCall($string_replace, ``, `replace`, tmpMCP$1, tmpArrElement);
$(tmpClusterSSA_p);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const $dlr_$$5 = { z: `split`, a: `a` };
let tmpClusterSSA_c$2 = 10;
const $dlr_$$3 = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  `function`,
  undefined,
  undefined,
  undefined,
  `return`,
  undefined,
  `String`,
  `if`,
  `replace`,
  `while`,
  undefined,
  `10`,
  undefined,
  `eval`,
  `new`,
  `RegExp`,
  `x20f`,
  undefined,
  `u0020g`,
  `not_expr`,
  `split`,
];
while (true) {
  const tmpPostUpdArgIdent$2 = tmpClusterSSA_c$2;
  tmpClusterSSA_c$2 = tmpClusterSSA_c$2 - 1;
  if (tmpPostUpdArgIdent$2) {
    const tmpAssignComMemLhsProp$2 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
    let tmpAssignComputedRhs$2 = $dlr_$$3[tmpClusterSSA_c$2];
    if (!tmpAssignComputedRhs$2) {
      tmpAssignComputedRhs$2 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
    }
    $dlr_$$5[tmpAssignComMemLhsProp$2] = tmpAssignComputedRhs$2;
  } else {
    break;
  }
}
const tmpArrElement = function ($dlr_$$0) {
  const tmpReturnArg$1 = $dlr_$$5[$dlr_$$0];
  return tmpReturnArg$1;
};
$($dotCall($string_replace, ``, `replace`, new $regex_constructor(`\\b\\w+\\b`, `g`), tmpArrElement));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  z: "split",
  a: "a",
};
let b = 10;
const c = [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "function", undefined, undefined, undefined, "return", undefined, "String", "if", "replace", "while", undefined, "10", undefined, "eval", "new", "RegExp", "x20f", undefined, "u0020g", "not_expr", "split" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b;
  b = b - 1;
  if (d) {
    const e = $dotCall( $number_toString, b, "toString", 36 );
    let f = c[ b ];
    if (f) {

    }
    else {
      f = $dotCall( $number_toString, b, "toString", 36 );
    }
    a[e] = f;
  }
  else {
    break;
  }
}
const g = function($$0 ) {
  const h = $$0;
  debugger;
  const i = a[ h ];
  return i;
};
const j = new $regex_constructor( "\\b\\w+\\b", "g" );
const k = $dotCall( $string_replace, "", "replace", j, g );
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let p = ``;
let tmpClusterSSA_c$1 = 11;
const $dlr_$$5 = { z: `split` };
const $dlr_$$3 = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  `function`,
  undefined,
  undefined,
  undefined,
  `return`,
  undefined,
  `String`,
  `if`,
  `replace`,
  `while`,
  undefined,
  `10`,
  undefined,
  `eval`,
  `new`,
  `RegExp`,
  `x20f`,
  undefined,
  `u0020g`,
  `not_expr`,
  `split`,
];
loopStop: {
  const tmpPostUpdArgIdent$1 = tmpClusterSSA_c$1;
  let tmpClusterSSA_c$2 = tmpClusterSSA_c$1 - 1;
  if (tmpPostUpdArgIdent$1) {
    const tmpAssignComMemLhsProp$1 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
    let tmpAssignComputedRhs$1 = $dlr_$$3[tmpClusterSSA_c$2];
    if (tmpAssignComputedRhs$1) {
    } else {
      tmpAssignComputedRhs$1 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
    }
    $dlr_$$5[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpPostUpdArgIdent$2 = tmpClusterSSA_c$2;
      tmpClusterSSA_c$2 = tmpClusterSSA_c$2 - 1;
      if (tmpPostUpdArgIdent$2) {
        const tmpAssignComMemLhsProp$2 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
        let tmpAssignComputedRhs$2 = $dlr_$$3[tmpClusterSSA_c$2];
        if (tmpAssignComputedRhs$2) {
        } else {
          tmpAssignComputedRhs$2 = $dotCall($number_toString, tmpClusterSSA_c$2, `toString`, 36);
        }
        $dlr_$$5[tmpAssignComMemLhsProp$2] = tmpAssignComputedRhs$2;
      } else {
        break;
      }
    }
  } else {
    break loopStop;
  }
}
const tmpArrElement = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const $dlr_$$8 = $dlr_$$0;
  const tmpReturnArg$1 = $dlr_$$5[$dlr_$$8];
  return tmpReturnArg$1;
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
- (todo) Support this ident in isFree CallExpression: $number_toString
- (todo) can we always safely clone ident refs in this case?
- (todo) objects in isFree check
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
