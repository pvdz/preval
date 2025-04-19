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
const tmpFree$1 /*:(number, string)=>string*/ = function $free($$0, $$1) {
  const perc /*:number*/ = $$0;
  const out_str /*:string*/ = $$1;
  debugger;
  const alt /*:string*/ = $dotCall($number_toString, perc, `toString`, 36);
  const tmpRet$1 /*:string*/ = out_str + alt;
  return tmpRet$1;
};
const tmpFree /*:(number, string)=>string*/ = function $free($$0, $$1) {
  const perc$1 /*:number*/ = $$0;
  const out_str$1 /*:string*/ = $$1;
  debugger;
  const plus /*:number*/ = perc$1 + 29;
  const chr /*:string*/ = $String_fromCharCode(plus);
  const tmpRet /*:string*/ = out_str$1 + chr;
  return tmpRet;
};
const pcode /*:(number)=>string*/ = function ($$0) {
  const num_arg /*:number*/ = $$0;
  debugger;
  let out_str$3 /*:string*/ = ``;
  const tmpIfTest /*:boolean*/ = num_arg < 62;
  if (tmpIfTest) {
  } else {
    const div /*:number*/ = num_arg / 62;
    const pint /*:number*/ = parseInt(div);
    out_str$3 = pcode(pint);
  }
  const perc$3 /*:number*/ = num_arg % 62;
  const tmpIfTest$1 /*:boolean*/ = perc$3 > 35;
  if (tmpIfTest$1) {
    const str /*:string*/ = $frfr(tmpFree, perc$3, out_str$3);
    return str;
  } else {
    const altstr /*:string*/ = $frfr(tmpFree$1, perc$3, out_str$3);
    return altstr;
  }
};
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
const tmpFree$1 = function $free(perc, out_str) {
  const tmpRet$1 = out_str + $dotCall($number_toString, perc, `toString`, 36);
  return tmpRet$1;
};
const tmpFree = function $free(perc$1, out_str$1) {
  const tmpRet = out_str$1 + $String_fromCharCode(perc$1 + 29);
  return tmpRet;
};
const pcode = function (num_arg) {
  let out_str$3 = ``;
  if (!(num_arg < 62)) {
    out_str$3 = pcode(parseInt(num_arg / 62));
  }
  const perc$3 = num_arg % 62;
  if (perc$3 > 35) {
    const str = $frfr(tmpFree, perc$3, out_str$3);
    return str;
  } else {
    const altstr = $frfr(tmpFree$1, perc$3, out_str$3);
    return altstr;
  }
};
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
  const f = d + e;
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
const m = function($$0 ) {
  const n = $$0;
  debugger;
  let o = "";
  const p = n < 62;
  if (p) {

  }
  else {
    const q = n / 62;
    const r = parseInt( q );
    o = m( r );
  }
  const s = n % 62;
  const t = s > 35;
  if (t) {
    const u = v( g, s, o );
    return u;
  }
  else {
    const w = v( a, s, o );
    return w;
  }
};
const x = m( 476 );
$( x );
const y = m( 475 );
$( y );
const z = m( 474 );
$( z );
const ba = m( 473 );
$( ba );
const bb = m( 472 );
$( bb );
const bc = m( 471 );
$( bc );
const bd = m( 470 );
$( bd );
const be = m( 469 );
$( be );
const bf = m( 468 );
$( bf );
const bg = m( 467 );
$( bg );
let bh = 466;
const bi = m( 466 );
$( bi );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  bh = bh - 1;
  const bj = bh > 0;
  if (bj) {
    const bk = m( bh );
    $( bk );
  }
  else {
    break;
  }
}
$( "end" );
`````


## Todos triggered


- (todo) do we want to support TemplateLiteral as expression statement in free loops?


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
