# Preval test case

# obj_right.md

> Normalize > Binary > With > Regex > Obj right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  /foo/g ** x,
  /foo/g * x,
  /foo/g / x,
  /foo/g % x,
  /foo/g + x,
  /foo/g - x,
  /foo/g << x,
  /foo/g >> x,
  /foo/g >>> x,
  /foo/g < x,
  /foo/g > x,
  /foo/g <= x,
  /foo/g >= x,
  /foo/g == x,
  /foo/g != x,
  /foo/g === x,
  /foo/g !== x,
  /foo/g & x,
  /foo/g ^ x,
  /foo/g | x,
];
$(arr);
$(/foo/g in x);
$(/foo/g instanceof x);
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const x /*:object*/ /*truthy*/ = {
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
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpBinLhs$1 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpBinLhs$3 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpBinLhs$5 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpStringConcatL /*:string*/ = $coerce(x, `plustr`);
const tmpBinLhs$9 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpBinLhs$11 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpBinLhs$13 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpBinLhs$15 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpBinLhs$19 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpBinLhs$21 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpBinLhs$23 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpBinLhs$33 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpArrElement$7 /*:string*/ /*truthy*/ = `/foo/g${tmpStringConcatL}`;
const arr /*:array*/ /*truthy*/ = [
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
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinLhs$39 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam /*:boolean*/ = tmpBinLhs$39 in x;
$(tmpCalleeParam);
const tmpBinLhs$41 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$1 /*:boolean*/ = tmpBinLhs$41 instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinLhs = new $regex_constructor(`foo`, `g`);
const x = {
  toString() {
    const tmpReturnArg = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement = tmpBinLhs ** x;
const tmpArrElement$1 = new $regex_constructor(`foo`, `g`) * x;
const tmpArrElement$3 = new $regex_constructor(`foo`, `g`) / x;
const tmpArrElement$5 = new $regex_constructor(`foo`, `g`) % x;
const tmpStringConcatL = $coerce(x, `plustr`);
const tmpArrElement$9 = new $regex_constructor(`foo`, `g`) - x;
const tmpArrElement$11 = new $regex_constructor(`foo`, `g`) << x;
const tmpArrElement$13 = new $regex_constructor(`foo`, `g`) >> x;
const tmpArrElement$15 = new $regex_constructor(`foo`, `g`) >>> x;
const tmpArrElement$17 = new $regex_constructor(`foo`, `g`) < x;
const tmpArrElement$19 = new $regex_constructor(`foo`, `g`) > x;
const tmpArrElement$21 = new $regex_constructor(`foo`, `g`) <= x;
const tmpArrElement$23 = new $regex_constructor(`foo`, `g`) >= x;
const tmpArrElement$33 = new $regex_constructor(`foo`, `g`) & x;
const tmpArrElement$35 = new $regex_constructor(`foo`, `g`) ^ x;
const tmpArrElement$37 = new $regex_constructor(`foo`, `g`) | x;
const tmpArrElement$7 = `/foo/g${tmpStringConcatL}`;
$([
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
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(new $regex_constructor(`foo`, `g`) in x);
$(new $regex_constructor(`foo`, `g`) instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "g" );
const b = {
  toString(  ) {
    debugger;
    const c = $( "toString" );
    return c;
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return 100;
  },
};
const d = a ** b;
const e = new $regex_constructor( "foo", "g" );
const f = e * b;
const g = new $regex_constructor( "foo", "g" );
const h = g / b;
const i = new $regex_constructor( "foo", "g" );
const j = i % b;
const k = $coerce( b, "plustr" );
const l = new $regex_constructor( "foo", "g" );
const m = l - b;
const n = new $regex_constructor( "foo", "g" );
const o = n << b;
const p = new $regex_constructor( "foo", "g" );
const q = p >> b;
const r = new $regex_constructor( "foo", "g" );
const s = r >>> b;
const t = new $regex_constructor( "foo", "g" );
const u = t < b;
const v = new $regex_constructor( "foo", "g" );
const w = v > b;
const x = new $regex_constructor( "foo", "g" );
const y = x <= b;
const z = new $regex_constructor( "foo", "g" );
const ba = z >= b;
const bb = new $regex_constructor( "foo", "g" );
const bc = bb & b;
const bd = new $regex_constructor( "foo", "g" );
const be = bd ^ b;
const bf = new $regex_constructor( "foo", "g" );
const bg = bf | b;
const bh = `/foo/g${k}`;
const bi = [ d, f, h, j, bh, m, o, q, s, u, w, y, ba, false, true, false, true, bc, be, bg ];
$( bi );
const bj = new $regex_constructor( "foo", "g" );
const bk = bj in b;
$( bk );
const bl = new $regex_constructor( "foo", "g" );
const bm = bl instanceof b;
$( bm );
`````


## Normalized
(This is what phase1 received the first time)

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
const tmpBinLhs = new $regex_constructor(`foo`, `g`);
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 = tmpBinLhs$37 | x;
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
const tmpBinLhs$39 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam = tmpBinLhs$39 in x;
$(tmpCalleeParam);
const tmpBinLhs$41 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$1 = tmpBinLhs$41 instanceof x;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


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
 - 17: [NaN, NaN, NaN, NaN, '/foo/g100', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 100, 100]
 - 18: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
