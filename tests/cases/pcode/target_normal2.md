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

## Pre Normal


`````js filename=intro
const tmpFree = function $free($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const num_arg = $dlr_$$0;
  const div = num_arg / 62;
  const tmpRet = parseInt(div);
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
    const alt = perc.toString(36);
    const altstr = out_str + alt;
    return altstr;
  }
};
const a = pcode(1);
$(a);
const b = pcode(2);
$(b);
`````

## Normalized


`````js filename=intro
const tmpFree = function $free($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const num_arg = $dlr_$$0;
  const div = num_arg / 62;
  const tmpRet = parseInt(div);
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
    const alt = perc.toString(36);
    const altstr = out_str + alt;
    return altstr;
  }
};
const a = pcode(1);
$(a);
const b = pcode(2);
$(b);
`````

## Output


`````js filename=intro
const tmpFree$1 /*:(number, string)=>string*/ = function $free($$0, $$1) {
  const perc /*:number*/ = $$0;
  const out_str /*:string*/ = $$1;
  debugger;
  const alt /*:string*/ = perc.toString(36);
  const tmpRet$1 /*:string*/ = out_str + alt;
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
  const $dlr_$$1 /*:number*/ = $$0;
  debugger;
  let out_str$1 /*:string*/ = ``;
  const tmpIfTest /*:boolean*/ = $dlr_$$1 < 62;
  if (tmpIfTest) {
  } else {
    const pint /*:number*/ = $frfr(tmpFree, $dlr_$$1);
    out_str$1 = pcode(pint);
  }
  const perc$1 /*:number*/ = $dlr_$$1 % 62;
  const tmpIfTest$1 /*:boolean*/ = perc$1 > 35;
  if (tmpIfTest$1) {
    const plus /*:number*/ = perc$1 + 29;
    const chr /*:string*/ = $String_fromCharCode(plus);
    const str /*:string*/ = out_str$1 + chr;
    return str;
  } else {
    const altstr /*:string*/ = $frfr(tmpFree$1, perc$1, out_str$1);
    return altstr;
  }
};
const a /*:string*/ = pcode(1);
$(a);
const b /*:string*/ = pcode(2);
$(b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c.toString( 36 );
  const f = d + e;
  return f;
};
const g = function b($$0 ) {
  const h = $$0;
  debugger;
  const i = h / 62;
  const j = parseInt( i );
  return j;
};
const k = function($$0 ) {
  const l = $$0;
  debugger;
  let m = "";
  const n = l < 62;
  if (n) {

  }
  else {
    const o = p( g, l );
    m = k( o );
  }
  const q = l % 62;
  const r = q > 35;
  if (r) {
    const s = q + 29;
    const t = $String_fromCharCode( s );
    const u = m + t;
    return u;
  }
  else {
    const v = p( a, q, m );
    return v;
  }
};
const w = k( 1 );
$( w );
const x = k( 2 );
$( x );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1'
 - 2: '2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
