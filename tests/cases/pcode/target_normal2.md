# Preval test case

# target_normal2.md

> Pcode > Target normal2
>
> This is a cut-out of the obfuscation case that triggered me to start on the pcode approach :)

this narrows in on a problem where `out_str` could not be determined to be a string
--> it was because phase1.1 was ignoring lets...

## Input

`````js filename=intro
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const num_arg /*:number*/ = $$0;
  debugger;
  const div /*:number*/ = num_arg / 62;
  const tmpRet /*:number*/ = parseInt(div);
  return tmpRet;
};
const pcode /*:(number)=>string*/ = function($$0) {
  const num_arg$1 /*:number*/ = $$0;
  debugger;
  let out_str /*:unknown*/ = ``;
  const tmpIfTest /*:boolean*/ = num_arg$1 < 62;
  if (tmpIfTest) {
  } else {
    const pint /*:number*/ = $frfr(tmpFree, num_arg$1);
    out_str = pcode(pint);
  }
  const perc /*:number*/ = num_arg$1 % 62;
  const tmpIfTest$1 /*:boolean*/ = perc > 35;
  if (tmpIfTest$1) {
    const plus /*:number*/ = perc + 29;
    const chr /*:string*/ = $String_fromCharCode(plus);
    const str /*:string*/ = out_str + chr;
    return str;
  } else {
    const alt /*:string*/ = perc.toString(36);
    const altstr /*:string*/ = out_str + alt;
    return altstr;
  }
};
const a /*:string*/ = pcode(1);
$(a);
const b /*:string*/ = pcode(2);
$(b);
`````


## Settled


`````js filename=intro
const tmpFree$2 /*:(number, string)=>string*/ = function $free($$0, $$1) {
  const perc$3 /*:number*/ = $$0;
  const out_str$1 /*:string*/ = $$1;
  debugger;
  const alt /*:string*/ = $dotCall($number_toString, perc$3, `toString`, 36);
  const tmpRet$2 /*:string*/ = out_str$1 + alt;
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
  const $dlr_$$0 /*:number*/ = $$0;
  debugger;
  const div /*:number*/ = $dlr_$$0 / 62;
  const tmpRet /*:number*/ = $Number_parseInt(div);
  return tmpRet;
};
const pcode /*:(number)=>string*/ = function ($$0) {
  const $dlr_$$2 /*:number*/ = $$0;
  debugger;
  let out_str$2 /*:string*/ /*ternaryConst*/ = ``;
  const tmpIfTest /*:boolean*/ = $dlr_$$2 < 62;
  if (tmpIfTest) {
  } else {
    const pint /*:number*/ = $frfr(tmpFree, $dlr_$$2);
    out_str$2 = pcode(pint);
  }
  const perc$2 /*:number*/ = $dlr_$$2 % 62;
  const tmpIfTest$1 /*:boolean*/ = perc$2 > 35;
  if (tmpIfTest$1) {
    const str /*:string*/ = $frfr(tmpFree$1, perc$2, out_str$2);
    return str;
  } else {
    const altstr /*:string*/ = $frfr(tmpFree$2, perc$2, out_str$2);
    return altstr;
  }
};
const a /*:string*/ = pcode(1);
$(a);
const b /*:string*/ = pcode(2);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$2 = function $free(perc$3, out_str$1) {
  const tmpRet$2 = out_str$1 + $dotCall($number_toString, perc$3, `toString`, 36);
  return tmpRet$2;
};
const tmpFree$1 = function $free(perc$1, out_str) {
  const tmpRet$1 = out_str + $String_fromCharCode(perc$1 + 29);
  return tmpRet$1;
};
const tmpFree = function $free($dlr_$$0) {
  const tmpRet = $Number_parseInt($dlr_$$0 / 62);
  return tmpRet;
};
const pcode = function ($dlr_$$2) {
  let out_str$2 = ``;
  if (!($dlr_$$2 < 62)) {
    out_str$2 = pcode($frfr(tmpFree, $dlr_$$2));
  }
  const perc$2 = $dlr_$$2 % 62;
  if (perc$2 > 35) {
    const str = $frfr(tmpFree$1, perc$2, out_str$2);
    return str;
  } else {
    const altstr = $frfr(tmpFree$2, perc$2, out_str$2);
    return altstr;
  }
};
$(pcode(1));
$(pcode(2));
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
const ba = q( 1 );
$( ba );
const bb = q( 2 );
$( bb );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree = function $free($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const num_arg = $dlr_$$0;
  const div = num_arg / 62;
  const tmpRet = $Number_parseInt(div);
  return tmpRet;
};
const pcode = function ($$0) {
  let $dlr_$$1 = $$0;
  debugger;
  const num_arg$1 = $dlr_$$1;
  let out_str = ``;
  const tmpIfTest = num_arg$1 < 62;
  if (tmpIfTest) {
  } else {
    const pint = $frfr(tmpFree, num_arg$1);
    out_str = pcode(pint);
  }
  const perc = num_arg$1 % 62;
  const tmpIfTest$1 = perc > 35;
  if (tmpIfTest$1) {
    const plus = perc + 29;
    const chr = $String_fromCharCode(plus);
    const str = out_str + chr;
    return str;
  } else {
    const tmpMCF = perc.toString;
    const alt = $dotCall(tmpMCF, perc, `toString`, 36);
    const altstr = out_str + alt;
    return altstr;
  }
};
const a = pcode(1);
$(a);
const b = pcode(2);
$(b);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1'
 - 2: '2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
