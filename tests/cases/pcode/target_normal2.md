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
const tmpFree$3 /*:(number, string)=>string*/ = function $free($$0, $$1) {
  const perc /*:number*/ = $$0;
  const out_str /*:string*/ = $$1;
  debugger;
  const alt /*:string*/ = $dotCall($number_toString, perc, `toString`, 36);
  const tmpRet$3 /*:string*/ = out_str + alt;
  return tmpRet$3;
};
const tmpFree$1 /*:(number, string)=>string*/ = function $free($$0, $$1) {
  const perc$1 /*:number*/ = $$0;
  const out_str$1 /*:string*/ = $$1;
  debugger;
  const plus /*:number*/ = perc$1 + 29;
  const chr /*:string*/ = $String_fromCharCode(plus);
  const tmpRet$1 /*:string*/ = out_str$1 + chr;
  return tmpRet$1;
};
const tmpFree /*:(number)=>number*/ = function $free($$0) {
  const $dlr_$$0 /*:number*/ = $$0;
  debugger;
  const div /*:number*/ = $dlr_$$0 / 62;
  const tmpRet /*:number*/ = parseInt(div);
  return tmpRet;
};
const pcode /*:(number)=>string*/ = function ($$0) {
  const $dlr_$$2 /*:number*/ = $$0;
  debugger;
  let out_str$3 /*:string*/ = ``;
  const tmpIfTest /*:boolean*/ = $dlr_$$2 < 62;
  if (tmpIfTest) {
  } else {
    const pint /*:number*/ = $frfr(tmpFree, $dlr_$$2);
    out_str$3 = pcode(pint);
  }
  const perc$3 /*:number*/ = $dlr_$$2 % 62;
  const tmpIfTest$1 /*:boolean*/ = perc$3 > 35;
  if (tmpIfTest$1) {
    const str /*:string*/ = $frfr(tmpFree$1, perc$3, out_str$3);
    return str;
  } else {
    const altstr /*:string*/ = $frfr(tmpFree$3, perc$3, out_str$3);
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
const tmpFree$3 = function $free(perc, out_str) {
  const tmpRet$3 = out_str + $dotCall($number_toString, perc, `toString`, 36);
  return tmpRet$3;
};
const tmpFree$1 = function $free(perc$1, out_str$1) {
  const tmpRet$1 = out_str$1 + $String_fromCharCode(perc$1 + 29);
  return tmpRet$1;
};
const tmpFree = function $free($dlr_$$0) {
  const tmpRet = parseInt($dlr_$$0 / 62);
  return tmpRet;
};
const pcode = function ($dlr_$$2) {
  let out_str$3 = ``;
  if (!($dlr_$$2 < 62)) {
    out_str$3 = pcode($frfr(tmpFree, $dlr_$$2));
  }
  const perc$3 = $dlr_$$2 % 62;
  if (perc$3 > 35) {
    const str = $frfr(tmpFree$1, perc$3, out_str$3);
    return str;
  } else {
    const altstr = $frfr(tmpFree$3, perc$3, out_str$3);
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
  const p = parseInt( o );
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


## Todos triggered


None


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
