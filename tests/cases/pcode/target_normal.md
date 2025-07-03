# Preval test case

# target_normal.md

> Pcode > Target normal
>
> This is a cut-out of the obfuscation case that triggered me to start on the pcode approach :)

non-pcode test

## Input

`````js filename=intro
let pcode = function(num_arg) {
  let out_str = ``;
  const tmpIfTest = num_arg < 62;
  if (tmpIfTest) {

  } else {
    const div = num_arg / 62;
    const pint = parseInt(div);
    out_str = pcode(pint); // including recursion
  }
  const perc = num_arg % 62;
  const tmpIfTest$1 = perc > 35;
  if (tmpIfTest$1) {
    const plus = perc + 29;
    const chr = String.fromCharCode(plus);
    const str = out_str + chr;
    return str;
  } else {
    const alt = perc.toString(36);
    const altstr = out_str + alt;
    return altstr;
  }
};
pcode(1);
pcode(2);
let i = 477; 
while (--i > 0) {
  const s = pcode(i);
  $(s);
}
$('end');
`````


## Settled


`````js filename=intro
const tmpFree$2 /*:(number, string)=>string*/ = function $free($$0, $$1) {
  const perc$3 /*:number*/ = $$0;
  const out_str$1 /*:string*/ = $$1;
  debugger;
  const alt /*:string*/ = $dotCall($number_toString, perc$3, `toString`, 36);
  const tmpRet$2 /*:string*/ = `${out_str$1}${alt}`;
  return tmpRet$2;
};
const tmpFree$1 /*:(number, string)=>string*/ = function $free($$0, $$1) {
  const perc$1 /*:number*/ = $$0;
  const out_str /*:string*/ = $$1;
  debugger;
  const plus /*:number*/ = perc$1 + 29;
  const chr /*:string*/ = $String_fromCharCode(plus);
  const tmpRet$1 /*:string*/ = out_str + chr;
  return tmpRet$1;
};
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const num_arg /*:number*/ = $$0;
  debugger;
  const div /*:number*/ = num_arg / 62;
  const tmpRet /*:number*/ = $Number_parseInt(div);
  return tmpRet;
};
const pcode /*:(number)=>string*/ = function ($$0) {
  const num_arg$1 /*:number*/ = $$0;
  debugger;
  let out_str$2 /*:string*/ /*ternaryConst*/ = ``;
  const tmpIfTest /*:boolean*/ = num_arg$1 < 62;
  if (tmpIfTest) {
  } else {
    const pint /*:number*/ = $frfr(tmpFree, num_arg$1);
    out_str$2 = pcode(pint);
  }
  const perc$2 /*:number*/ = num_arg$1 % 62;
  const tmpIfTest$1 /*:boolean*/ = perc$2 > 35;
  if (tmpIfTest$1) {
    const str /*:string*/ = $frfr(tmpFree$1, perc$2, out_str$2);
    return str;
  } else {
    const altstr /*:string*/ = $frfr(tmpFree$2, perc$2, out_str$2);
    return altstr;
  }
};
pcode(1);
pcode(2);
const s /*:string*/ = pcode(476);
$(s);
const s$1 /*:string*/ = pcode(475);
$(s$1);
const s$2 /*:string*/ = pcode(474);
$(s$2);
const s$3 /*:string*/ = pcode(473);
$(s$3);
const s$4 /*:string*/ = pcode(472);
$(s$4);
const s$5 /*:string*/ = pcode(471);
$(s$5);
const s$6 /*:string*/ = pcode(470);
$(s$6);
const s$7 /*:string*/ = pcode(469);
$(s$7);
const s$8 /*:string*/ = pcode(468);
$(s$8);
const s$9 /*:string*/ = pcode(467);
$(s$9);
let tmpClusterSSA_i$2 /*:number*/ = 466;
const s$10 /*:string*/ = pcode(466);
$(s$10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  tmpClusterSSA_i$2 = tmpClusterSSA_i$2 - 1;
  const tmpIfTest$3 /*:boolean*/ = tmpClusterSSA_i$2 > 0;
  if (tmpIfTest$3) {
    const s$11 /*:string*/ = pcode(tmpClusterSSA_i$2);
    $(s$11);
  } else {
    break;
  }
}
$(`end`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$2 = function $free(perc$3, out_str$1) {
  const alt = $dotCall($number_toString, perc$3, `toString`, 36);
  const tmpRet$2 = `${out_str$1}${alt}`;
  return tmpRet$2;
};
const tmpFree$1 = function $free(perc$1, out_str) {
  const tmpRet$1 = out_str + $String_fromCharCode(perc$1 + 29);
  return tmpRet$1;
};
const tmpFree = function $free(num_arg) {
  const tmpRet = $Number_parseInt(num_arg / 62);
  return tmpRet;
};
const pcode = function (num_arg$1) {
  let out_str$2 = ``;
  if (!(num_arg$1 < 62)) {
    out_str$2 = pcode(tmpFree(num_arg$1));
  }
  const perc$2 = num_arg$1 % 62;
  if (perc$2 > 35) {
    const str = tmpFree$1(perc$2, out_str$2);
    return str;
  } else {
    const altstr = tmpFree$2(perc$2, out_str$2);
    return altstr;
  }
};
pcode(1);
pcode(2);
$(pcode(476));
$(pcode(475));
$(pcode(474));
$(pcode(473));
$(pcode(472));
$(pcode(471));
$(pcode(470));
$(pcode(469));
$(pcode(468));
$(pcode(467));
let tmpClusterSSA_i$2 = 466;
$(pcode(466));
while (true) {
  tmpClusterSSA_i$2 = tmpClusterSSA_i$2 - 1;
  if (tmpClusterSSA_i$2 > 0) {
    $(pcode(tmpClusterSSA_i$2));
  } else {
    break;
  }
}
$(`end`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = $dotCall( $number_toString, c, "toString", 36 );
  const f = `${d}${e}`;
  return f;
};
const g = function b($$0,$$1 ) {
  const h = $$0;
  const i = $$1;
  debugger;
  const j = h + 29;
  const k = $String_fromCharCode( j );
  const l = i + k;
  return l;
};
const m = function b($$0 ) {
  const n = $$0;
  debugger;
  const o = n / 62;
  const p = $Number_parseInt( o );
  return p;
};
const q = function($$0 ) {
  const r = $$0;
  debugger;
  let s = "";
  const t = r < 62;
  if (t) {

  }
  else {
    const u = v( m, r );
    s = q( u );
  }
  const w = r % 62;
  const x = w > 35;
  if (x) {
    const y = v( g, w, s );
    return y;
  }
  else {
    const z = v( a, w, s );
    return z;
  }
};
q( 1 );
q( 2 );
const ba = q( 476 );
$( ba );
const bb = q( 475 );
$( bb );
const bc = q( 474 );
$( bc );
const bd = q( 473 );
$( bd );
const be = q( 472 );
$( be );
const bf = q( 471 );
$( bf );
const bg = q( 470 );
$( bg );
const bh = q( 469 );
$( bh );
const bi = q( 468 );
$( bi );
const bj = q( 467 );
$( bj );
let bk = 466;
const bl = q( 466 );
$( bl );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  bk = bk - 1;
  const bm = bk > 0;
  if (bm) {
    const bn = q( bk );
    $( bn );
  }
  else {
    break;
  }
}
$( "end" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let pcode = function ($$0) {
  let num_arg = $$0;
  debugger;
  let out_str = ``;
  const tmpIfTest = num_arg < 62;
  if (tmpIfTest) {
  } else {
    const div = num_arg / 62;
    const pint = $Number_parseInt(div);
    out_str = pcode(pint);
  }
  const perc = num_arg % 62;
  const tmpIfTest$1 = perc > 35;
  if (tmpIfTest$1) {
    const plus = perc + 29;
    const tmpMCF = $String_fromCharCode;
    const chr = $String_fromCharCode(plus);
    const str = out_str + chr;
    return str;
  } else {
    const tmpMCF$1 = perc.toString;
    const alt = $dotCall(tmpMCF$1, perc, `toString`, 36);
    const altstr = out_str + alt;
    return altstr;
  }
};
pcode(1);
pcode(2);
let i = 477;
while (true) {
  const tmpPostUpdArgIdent = $coerce(i, `number`);
  i = tmpPostUpdArgIdent - 1;
  const tmpBinLhs = i;
  const tmpIfTest$2 = tmpBinLhs > 0;
  if (tmpIfTest$2) {
    const s = pcode(i);
    $(s);
  } else {
    break;
  }
}
$(`end`);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '7G'
 - 2: '7F'
 - 3: '7E'
 - 4: '7D'
 - 5: '7C'
 - 6: '7B'
 - 7: '7A'
 - 8: '7z'
 - 9: '7y'
 - 10: '7x'
 - 11: '7w'
 - 12: '7v'
 - 13: '7u'
 - 14: '7t'
 - 15: '7s'
 - 16: '7r'
 - 17: '7q'
 - 18: '7p'
 - 19: '7o'
 - 20: '7n'
 - 21: '7m'
 - 22: '7l'
 - 23: '7k'
 - 24: '7j'
 - 25: '7i'
 - 26: '7h'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
