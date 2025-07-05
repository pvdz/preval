# Preval test case

# unthrowable.md

> Tofix > unthrowable
>
> This can't throw. We can prove it and remove the try.

## Input

`````js filename=intro
const g = function(x) {
  const tmpIfTest$1 = (typeof x) === `string`;
  if (!tmpIfTest$1) {
    const div = x / x;
    if (`${div}`.length === 1) {
      x % 0;
    }
    $(x);             // prevent infinite loop
    g(x + 1);
  }
};
const f = function(arg) {
  try {
    if (arg) {        // we can prove that `arg` is reachable, this ref cant throw
      return g;       // we can prove that g is a defined global, this ref can't throw
    } else {
      g(0);           // we can prove that g is a defined global, this ref can't throw
    }
  } catch (_0x4ccec3) {

  }
};
$(f());
`````


## Settled


`````js filename=intro
const tmpFree$1 /*:(primitive)=>boolean*/ = function $free($$0) {
  const x /*:primitive*/ = $$0;
  debugger;
  const tmpBinLhs /*:string*/ /*truthy*/ = typeof x;
  const tmpRet$1 /*:boolean*/ = tmpBinLhs === `string`;
  return tmpRet$1;
};
const tmpFree /*:(primitive)=>string*/ = function $free($$0) {
  const x$1 /*:primitive*/ = $$0;
  debugger;
  const div /*:number*/ = x$1 / x$1;
  const tmpBinBothRhs /*:string*/ = $coerce(div, `string`);
  return tmpBinBothRhs;
};
const g /*:(primitive)=>undefined*/ = function ($$0) {
  const x$2 /*:primitive*/ = $$0;
  debugger;
  const tmpIfTest$1 /*:boolean*/ = $frfr(tmpFree$1, x$2);
  if (tmpIfTest$1) {
    return undefined;
  } else {
    const tmpCompObj /*:string*/ = $frfr(tmpFree, x$2);
    tmpCompObj.length;
    $(x$2);
    const tmpCalleeParam /*:primitive*/ = x$2 + 1;
    g(tmpCalleeParam);
    return undefined;
  }
};
try {
  g(0);
} catch (_0x4ccec3) {}
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(x) {
  const tmpRet$1 = typeof x === `string`;
  return tmpRet$1;
};
const tmpFree = function $free(x$1) {
  const tmpBinBothRhs = String(x$1 / x$1);
  return tmpBinBothRhs;
};
const g = function (x$2) {
  const tmpIfTest$1 = tmpFree$1(x$2);
  if (!tmpIfTest$1) {
    tmpFree(x$2).length;
    $(x$2);
    g(x$2 + 1);
  }
};
try {
  g(0);
} catch (_0x4ccec3) {}
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = typeof c;
  const e = d === "string";
  return e;
};
const f = function b($$0 ) {
  const g = $$0;
  debugger;
  const h = g / g;
  const i = $coerce( h, "string" );
  return i;
};
const j = function($$0 ) {
  const k = $$0;
  debugger;
  const l = m( a, k );
  if (l) {
    return undefined;
  }
  else {
    const n = m( f, k );
    n.length;
    $( k );
    const o = k + 1;
    j( o );
    return undefined;
  }
};
try {
  j( 0 );
}
catch (p) {

}
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const g = function ($$0) {
  let x = $$0;
  debugger;
  const tmpBinLhs = typeof x;
  const tmpIfTest$1 = tmpBinLhs === `string`;
  if (tmpIfTest$1) {
    return undefined;
  } else {
    const div = x / x;
    const tmpBinBothLhs = ``;
    const tmpBinBothRhs = $coerce(div, `string`);
    const tmpBinLhs$3 = tmpBinBothLhs + tmpBinBothRhs;
    const tmpCompObj = $coerce(tmpBinLhs$3, `plustr`);
    const tmpBinLhs$1 = tmpCompObj.length;
    const tmpIfTest = tmpBinLhs$1 === 1;
    if (tmpIfTest) {
      x % 0;
      $(x);
    } else {
      $(x);
    }
    const tmpCallCallee = g;
    let tmpCalleeParam = x + 1;
    g(tmpCalleeParam);
    return undefined;
  }
};
const f = function ($$0) {
  let arg = $$0;
  debugger;
  try {
    if (arg) {
      return g;
    } else {
      g(0);
    }
  } catch (_0x4ccec3) {}
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 5
 - 7: 6
 - 8: 7
 - 9: 8
 - 10: 9
 - 11: 10
 - 12: 11
 - 13: 12
 - 14: 13
 - 15: 14
 - 16: 15
 - 17: 16
 - 18: 17
 - 19: 18
 - 20: 19
 - 21: 20
 - 22: 21
 - 23: 22
 - 24: 23
 - 25: 24
 - 26: 25
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
