# Preval test case

# nan_op_x_crapstring.md

> Normalize > Binary > With > Null > Nan op x crapstring
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  null ** x,
  null * x,
  null / x,
  null % x,
  null + x,
  null - x,
  null << x,
  null >> x,
  null >>> x,
  null < x,
  null > x,
  null <= x,
  null >= x,
  null == x,
  null != x,
  null === x,
  null !== x,
  null & x,
  null ^ x,
  null | x,
];
$(arr);

const arr2 = [
  null in x,
  null instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const x = {
  toString() {
    debugger;
    return $(`toString`);
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const arr = [
  null ** x,
  null * x,
  null / x,
  null % x,
  null + x,
  null - x,
  null << x,
  null >> x,
  null >>> x,
  null < x,
  null > x,
  null <= x,
  null >= x,
  null == x,
  null != x,
  null === x,
  null !== x,
  null & x,
  null ^ x,
  null | x,
];
$(arr);
const arr2 = [null in x, null instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const x = {
  toString() {
    debugger;
    const tmpReturnArg = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = null + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = null < x;
const tmpArrElement$19 = null > x;
const tmpArrElement$21 = null <= x;
const tmpArrElement$23 = null >= x;
const tmpArrElement$25 = null == x;
const tmpArrElement$27 = null != x;
const tmpArrElement$29 = null === x;
const tmpArrElement$31 = null !== x;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const arr = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = null in x;
const tmpArrElement$41 = null instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const x /*:object*/ = {
  toString() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement /*:number*/ = 0 ** x;
const tmpArrElement$1 /*:number*/ = 0 * x;
const tmpArrElement$3 /*:number*/ = 0 / x;
const tmpArrElement$5 /*:number*/ = 0 % x;
const tmpArrElement$7 /*:primitive*/ = null + x;
const tmpArrElement$9 /*:number*/ = 0 - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = null < x;
const tmpArrElement$19 /*:boolean*/ = null > x;
const tmpArrElement$21 /*:boolean*/ = null <= x;
const tmpArrElement$23 /*:boolean*/ = null >= x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const arr /*:array*/ = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 /*:boolean*/ = null in x;
const tmpArrElement$41 /*:boolean*/ = null instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  toString(  ) {
    debugger;
    const b = $( "toString" );
    return b;
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return 100;
  },
};
const c = 0 ** a;
const d = 0 * a;
const e = 0 / a;
const f = 0 % a;
const g = null + a;
const h = 0 - a;
const i = 0 << a;
const j = 0 >> a;
const k = 0 >>> a;
const l = null < a;
const m = null > a;
const n = null <= a;
const o = null >= a;
a ** 0;
const p = 0 ^ a;
const q = 0 | a;
const r = [ c, d, e, f, g, h, i, j, k, l, m, n, o, false, true, false, true, 0, p, q ];
$( r );
const s = null in a;
const t = null instanceof a;
const u = [ s, t ];
$( u );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'valueOf'
 - 2: 'valueOf'
 - 3: 'valueOf'
 - 4: 'valueOf'
 - 5: 'valueOf'
 - 6: 'valueOf'
 - 7: 'valueOf'
 - 8: 'valueOf'
 - 9: 'valueOf'
 - 10: 'valueOf'
 - 11: 'valueOf'
 - 12: 'valueOf'
 - 13: 'valueOf'
 - 14: 'valueOf'
 - 15: 'valueOf'
 - 16: 'valueOf'
 - 17: [0, 0, 0, 0, 100, -100, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 100, 100]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
