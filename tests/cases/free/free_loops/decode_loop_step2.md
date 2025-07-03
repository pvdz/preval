# Preval test case

# decode_loop_step2.md

> Free > Free loops > Decode loop step2
>
>

## Input

`````js filename=intro
// This is $free result. The func expr name must be $free because that's a $frfr constraint.
const freeFunc1/*:(number, number)=>number*/ = function $free(tmpClusterSSA__0x11AE1$3/*:number*/, _0x11B11$3/*:number*/) {
  const tmp/*:number*/ = _0x11B11$3 * (tmpClusterSSA__0x11AE1$3 + 287);
  return tmp;
};
const freeFunc2/*:(number, number)=>number*/ = function $free(tmpClusterSSA__0x11AE1$1/*:number*/, _0x11B11$1/*:number*/) {
  const tmp/*:number*/ = _0x11B11$1 * (tmpClusterSSA__0x11AE1$1 + 356);
  return tmp;
};
let limiter/*:number*/ = 26198;
let counter/*:number*/ = 0;
// Note: Original array had 8k chars but we don't need that for the test
const _0x11B59/*:array*/ = [`p`, `s`, `e`, ` `, `k`, `t`, `m`, `i`, `t`, `y`, `e`, `n`, `T`, `c`, `%`, `a`, `a`, `s`, `t`, `s`, `t`, `j`, `e`, `V`, `a`, `t`, `n`, `%`, `d`, `s`, `Q`, `p`, `e`, `d`, `n`, `a`, `_`, `g`, `P`, `r`, `o`, `v`, `a`, `r`, `a`, `%`, `r`, `p`, `r`, `n`, `r`, `d`, `c`, `R`, `D`, `d`, `i`, `p`, `r`, `o`, `e`, `e`, `r`, `a`, `r`, `%`, `%`, `u`, `e`, `t`, `I`, `c`, `d`, `p`, `d`];
while (true) {
  if (counter < 20) {
    const a/*:number*/ = $frfr(freeFunc1, counter, limiter);
    const a2/*:number*/ = limiter % 41344;
    const b/*:number*/ = $frfr(freeFunc2, counter, limiter);
    const b2/*:number*/ = limiter % 16941;
    const aa2/*:number*/ = a + a2;
    const a3/*:number*/ = aa2 % 8882;
    const chr_a3 = _0x11B59[a3];
    const bb2/*:number*/ = b + b2;
    const b3/*:number*/ = bb2 % 8882;
    const chr_b3 = _0x11B59[b3];
    _0x11B59[a3] = chr_b3;
    _0x11B59[b3] = chr_a3;
    limiter = (aa2 + bb2) % 1973047;
    counter = counter + 1;
  } else {
    break;
  }
}
$(0x11B59)
`````


## Settled


`````js filename=intro
$(72537);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(72537);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 72537 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const freeFunc1 = function $free($$0, $$1) {
  let tmpClusterSSA__0x11AE1$3 = $$0;
  let _0x11B11$3 = $$1;
  debugger;
  const tmpBinBothLhs = _0x11B11$3;
  const tmpBinBothRhs = tmpClusterSSA__0x11AE1$3 + 287;
  const tmp = tmpBinBothLhs * tmpBinBothRhs;
  return tmp;
};
const freeFunc2 = function $free($$0, $$1) {
  let tmpClusterSSA__0x11AE1$1 = $$0;
  let _0x11B11$1 = $$1;
  debugger;
  const tmpBinBothLhs$1 = _0x11B11$1;
  const tmpBinBothRhs$1 = tmpClusterSSA__0x11AE1$1 + 356;
  const tmp$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
  return tmp$1;
};
let limiter = 26198;
let counter = 0;
const _0x11B59 = [
  `p`,
  `s`,
  `e`,
  ` `,
  `k`,
  `t`,
  `m`,
  `i`,
  `t`,
  `y`,
  `e`,
  `n`,
  `T`,
  `c`,
  `%`,
  `a`,
  `a`,
  `s`,
  `t`,
  `s`,
  `t`,
  `j`,
  `e`,
  `V`,
  `a`,
  `t`,
  `n`,
  `%`,
  `d`,
  `s`,
  `Q`,
  `p`,
  `e`,
  `d`,
  `n`,
  `a`,
  `_`,
  `g`,
  `P`,
  `r`,
  `o`,
  `v`,
  `a`,
  `r`,
  `a`,
  `%`,
  `r`,
  `p`,
  `r`,
  `n`,
  `r`,
  `d`,
  `c`,
  `R`,
  `D`,
  `d`,
  `i`,
  `p`,
  `r`,
  `o`,
  `e`,
  `e`,
  `r`,
  `a`,
  `r`,
  `%`,
  `%`,
  `u`,
  `e`,
  `t`,
  `I`,
  `c`,
  `d`,
  `p`,
  `d`,
];
while (true) {
  const tmpIfTest = counter < 20;
  if (tmpIfTest) {
    const a = $frfr(freeFunc1, counter, limiter);
    const a2 = limiter % 41344;
    const b = $frfr(freeFunc2, counter, limiter);
    const b2 = limiter % 16941;
    const aa2 = a + a2;
    const a3 = aa2 % 8882;
    const chr_a3 = _0x11B59[a3];
    const bb2 = b + b2;
    const b3 = bb2 % 8882;
    const chr_b3 = _0x11B59[b3];
    _0x11B59[a3] = chr_b3;
    _0x11B59[b3] = chr_a3;
    const tmpBinLhs = aa2 + bb2;
    limiter = tmpBinLhs % 1973047;
    counter = counter + 1;
  } else {
    break;
  }
}
$(72537);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 72537
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
