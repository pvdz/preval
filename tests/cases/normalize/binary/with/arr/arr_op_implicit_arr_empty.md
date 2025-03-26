# Preval test case

# arr_op_implicit_arr_empty.md

> Normalize > Binary > With > Arr > Arr op implicit arr empty
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
- loopProtectLimit=1000

## Input

`````js filename=intro
const arr = [
  [] ** x,
  [] * x,
  [] / x,
  [] % x,
  [] + x,
  [] - x,
  [] << x,
  [] >> x,
  [] >>> x,
  [] < x,
  [] > x,
  [] <= x,
  [] >= x,
  [] == x,
  [] != x,
  [] === x,
  [] !== x,
  [] & x,
  [] ^ x,
  [] | x,
];
$(arr);

const arr2 = [
  [] in x,
  [] instanceof x,
];
$(arr2);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = 0 ** x;
const tmpArrElement$1 /*:number*/ = 0 * x;
const tmpArrElement$3 /*:number*/ = 0 / x;
const tmpArrElement$5 /*:number*/ = 0 % x;
const tmpArrElement$7 /*:string*/ = $coerce(x, `plustr`);
const tmpArrElement$9 /*:number*/ = 0 - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = `` < x;
const tmpArrElement$19 /*:boolean*/ = `` > x;
const tmpArrElement$21 /*:boolean*/ = `` <= x;
const tmpArrElement$23 /*:boolean*/ = `` >= x;
const tmpBinLhs$25 /*:array*/ = [];
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpBinLhs$27 /*:array*/ = [];
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
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
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinLhs$39 /*:array*/ = [];
const tmpArrElement$39 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpBinLhs$41 /*:array*/ = [];
const tmpArrElement$41 /*:boolean*/ = tmpBinLhs$41 instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = $coerce(x, `plustr`);
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `` < x;
const tmpArrElement$19 = `` > x;
const tmpArrElement$21 = `` <= x;
const tmpArrElement$23 = `` >= x;
const tmpArrElement$25 = [] == x;
const tmpArrElement$27 = [] != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
const tmpArrElement$39 = [] in x;
const tmpArrElement$41 = [] instanceof x;
$([tmpArrElement$39, tmpArrElement$41]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0 ** x;
const b = 0 * x;
const c = 0 / x;
const d = 0 % x;
const e = $coerce( x, "plustr" );
const f = 0 - x;
const g = 0 << x;
const h = 0 >> x;
const i = 0 >>> x;
const j = "" < x;
const k = "" > x;
const l = "" <= x;
const m = "" >= x;
const n = [];
const o = n == x;
const p = [];
const q = p != x;
x ** 0;
const r = 0 ^ x;
const s = 0 | x;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, o, q, false, true, 0, r, s ];
$( t );
const u = [];
const v = u in x;
const w = [];
const y = w instanceof x;
const z = [ v, y ];
$( z );
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
