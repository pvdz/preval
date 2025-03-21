# Preval test case

# arr_strings_op_implicit_x.md

> Normalize > Binary > With > Arr > Arr strings op implicit x
>
> Deal with certain primitive with binary ops

In this variant we tell preval that array is an empty array
so it will probably end up resolving most of these trivial
cases.
There's also a test where we give preval an array without telling
it the contents (through Array.from).
Also a variation where the array contents is some strings or numbers.

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  ['a', 'b', 'c'] ** x,
  ['a', 'b', 'c'] * x,
  ['a', 'b', 'c'] / x,
  ['a', 'b', 'c'] % x,
  ['a', 'b', 'c'] + x,
  ['a', 'b', 'c'] - x,
  ['a', 'b', 'c'] << x,
  ['a', 'b', 'c'] >> x,
  ['a', 'b', 'c'] >>> x,
  ['a', 'b', 'c'] < x,
  ['a', 'b', 'c'] > x,
  ['a', 'b', 'c'] <= x,
  ['a', 'b', 'c'] >= x,
  ['a', 'b', 'c'] == x,
  ['a', 'b', 'c'] != x,
  ['a', 'b', 'c'] === x,
  ['a', 'b', 'c'] !== x,
  ['a', 'b', 'c'] & x,
  ['a', 'b', 'c'] ^ x,
  ['a', 'b', 'c'] | x,
];
$(arr);

const arr2 = [
  ['a', 'b', 'c'] in x,
  ['a', 'b', 'c'] instanceof x,
];
$(arr2);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = `a,b,c` ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatL /*:string*/ = $coerce(x, `plustr`);
x ** 0;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = `a,b,c` < x;
const tmpArrElement$19 /*:boolean*/ = `a,b,c` > x;
const tmpArrElement$21 /*:boolean*/ = `a,b,c` <= x;
const tmpArrElement$23 /*:boolean*/ = `a,b,c` >= x;
const tmpBinLhs$25 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpBinLhs$27 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const tmpArrElement$7 /*:string*/ = `a,b,c${tmpStringConcatL}`;
const arr /*:array*/ = [
  tmpArrElement,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinLhs$39 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$39 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpBinLhs$41 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$41 /*:boolean*/ = tmpBinLhs$41 instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = `a,b,c` ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatL = $coerce(x, `plustr`);
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `a,b,c` < x;
const tmpArrElement$19 = `a,b,c` > x;
const tmpArrElement$21 = `a,b,c` <= x;
const tmpArrElement$23 = `a,b,c` >= x;
const tmpArrElement$25 = [`a`, `b`, `c`] == x;
const tmpArrElement$27 = [`a`, `b`, `c`] != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const tmpArrElement$7 = `a,b,c${tmpStringConcatL}`;
$([
  tmpArrElement,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
const tmpArrElement$39 = [`a`, `b`, `c`] in x;
const tmpArrElement$41 = [`a`, `b`, `c`] instanceof x;
$([tmpArrElement$39, tmpArrElement$41]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "a,b,c" ** x;
x ** 0;
x ** 0;
x ** 0;
const b = $coerce( x, "plustr" );
x ** 0;
const c = 0 << x;
const d = 0 >> x;
const e = 0 >>> x;
const f = "a,b,c" < x;
const g = "a,b,c" > x;
const h = "a,b,c" <= x;
const i = "a,b,c" >= x;
const j = [ "a", "b", "c" ];
const k = j == x;
const l = [ "a", "b", "c" ];
const m = l != x;
x ** 0;
const n = 0 ^ x;
const o = 0 | x;
const p = `a,b,c${b}`;
const q = [ a, NaN, NaN, NaN, p, NaN, c, d, e, f, g, h, i, k, m, false, true, 0, n, o ];
$( q );
const r = [ "a", "b", "c" ];
const s = r in x;
const t = [ "a", "b", "c" ];
const u = t instanceof x;
const v = [ s, u ];
$( v );
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
