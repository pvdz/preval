# Preval test case

# try.md

> Pump > Try
>
> Loop pump with fake try/catch wrapper

## Input

`````js filename=intro
const arrB = [`body`, `abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr`, `return (function() `, `iframe`, `[?&]`, `translate(-50%, -50%) scale(`, `url`, `1362209nkUUHI`, `replace`, `9xZRzHa`, `transform`, `html`, `onresize`, `indexOf`, `abiOoSuUt:bIlankADCBvgHcQBEUXeTIAVMAGBVQCY`, `1JaahTn`, `3061356MCYqjv`, `342560iciMGV`, `I should become first element`, `shift`, `apply`, `toFixed`, `innerHeight`, `[PMqKQMxzmdxSqSWYuSGzTIQUgOHRSMAPMywHKjJxSSjMhXqTz]`, `fromCharCode`, `4752RglSeO`, `56iWBGHd`, `innerHTML`, `length`, `innerWidth`, `39FiERKs`, `push`, `{}.constructor("return this")( )`, `8BCJskD`, `style`, `660ZidKsh`, `2iSfZLX`, `97677mcFAZT`, `onkeydown`, `slice`, `href`, `exec`, `display`, `addEventListener`, `getBoundingClientRect`, `12301465WsvUdn`, `onload`, `12134309DXtrYO`, `597052UCghKm`, `2880154MAzcYZ`, `width`, `querySelector`, `preventDefault`, `block`, `6047706RzKpil`, `contextmenu`, `split`, `8119482rsyVwd`, `charCodeAt`, `.html`, `[OPIHFwFSsTXHOCpGGeeFsJMHCLEPCWr]`, `663804iQLXQy`];
while (true) {
  const _0x5cfb5d$49 = arrB[51];
  const tmpBinLhs$21 = parseInt(_0x5cfb5d$49);
  const _0x5cfb5d$47 = arrB[18];
  const tmpBinLhs$23 = parseInt(_0x5cfb5d$47);
  const tmpBinBothLhs$31 = tmpBinLhs$21 / 1;
  const tmpBinBothRhs$31 = tmpBinLhs$23 / 2;
  const tmpBinBothLhs$29 = tmpBinBothLhs$31 * tmpBinBothRhs$31;
  const _0x5cfb5d$45 = arrB[43];
  const tmpBinLhs$25 = parseInt(_0x5cfb5d$45);
  const tmpBinBothRhs$29 = tmpBinLhs$25 / 3;
  const tmpBinBothLhs$27 = tmpBinBothLhs$29 + tmpBinBothRhs$29;
  const _0x5cfb5d$43 = arrB[8];
  const tmpUnaryArg$13 = parseInt(_0x5cfb5d$43);
  const tmpBinLhs$27 = -tmpUnaryArg$13;
  const tmpBinBothLhs$33 = tmpBinLhs$27 / 4;
  const _0x5cfb5d$41 = arrB[61];
  const tmpUnaryArg$15 = parseInt(_0x5cfb5d$41);
  const tmpBinLhs$29 = -tmpUnaryArg$15;
  const tmpBinBothRhs$33 = tmpBinLhs$29 / 5;
  const tmpBinBothRhs$27 = tmpBinBothLhs$33 * tmpBinBothRhs$33;
  const tmpBinBothLhs$25 = tmpBinBothLhs$27 + tmpBinBothRhs$27;
  const _0x5cfb5d$39 = arrB[39];
  const tmpUnaryArg$17 = parseInt(_0x5cfb5d$39);
  const tmpBinLhs$31 = -tmpUnaryArg$17;
  const tmpBinBothRhs$25 = tmpBinLhs$31 / 6;
  const tmpBinBothLhs$23 = tmpBinBothLhs$25 + tmpBinBothRhs$25;
  const _0x5cfb5d$37 = arrB[36];
  const tmpUnaryArg$19 = parseInt(_0x5cfb5d$37);
  const tmpBinLhs$33 = -tmpUnaryArg$19;
  const tmpBinBothLhs$35 = tmpBinLhs$33 / 7;
  const _0x5cfb5d$35 = arrB[15];
  const tmpBinLhs$35 = parseInt(_0x5cfb5d$35);
  const tmpBinBothRhs$35 = tmpBinLhs$35 / 8;
  const tmpBinBothRhs$23 = tmpBinBothLhs$35 * tmpBinBothRhs$35;
  const tmpBinBothLhs$21 = tmpBinBothLhs$23 + tmpBinBothRhs$23;
  const _0x5cfb5d$33 = arrB[19];
  const tmpBinLhs$37 = parseInt(_0x5cfb5d$33);
  const tmpBinBothLhs$37 = tmpBinLhs$37 / 9;
  const _0x5cfb5d$31 = arrB[17];
  const tmpUnaryArg$21 = parseInt(_0x5cfb5d$31);
  const tmpBinLhs$39 = -tmpUnaryArg$21;
  const tmpBinBothRhs$37 = tmpBinLhs$39 / 10;
  const tmpBinBothRhs$21 = tmpBinBothLhs$37 * tmpBinBothRhs$37;
  const tmpBinBothLhs$19 = tmpBinBothLhs$21 + tmpBinBothRhs$21;
  const _0x5cfb5d$29 = arrB[29];
  const tmpBinLhs$41 = parseInt(_0x5cfb5d$29);
  const tmpBinBothRhs$19 = tmpBinLhs$41 / 11;
  const tmpClusterSSA__0x1624f0 = tmpBinBothLhs$19 + tmpBinBothRhs$19;
  const tmpIfTest$5 = tmpClusterSSA__0x1624f0 === 712261;
  if (tmpIfTest$5) {
    break;
  } else {
    try {
      const tmpCalleeParam$47 = arrB.shift();
      arrB.push(tmpCalleeParam$47);
    } catch (_0x22a091) {
      const tmpCalleeParam$49 = arrB.shift();
      arrB.push(tmpCalleeParam$49);
    }
  }
}
$(arrB[0]);
`````


## Settled


`````js filename=intro
$(`I should become first element`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`I should become first element`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "I should become first element" );
`````


## Todos triggered


- (todo) inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'I should become first element'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
