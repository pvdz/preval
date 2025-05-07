# Preval test case

# pump.md

> Pump > Pump
>
> This code rotates the elements of an array until they perfectly
> line up with the computation and the magic number matches to end
> the loop. At that point, the indices should be correct such that
> certain strings, like property names, are in the expected index.
> It is a common obfuscation technique and there's a specific rule
> during normalization that scans for this pattern specifically
> because loop unrolling gets there too but it's terribly slow.
> 
> The arr.push(arr.shift()) part is what I call a "pump".
>
> This is case was part of a larger example found in the wild.

## Input

`````js filename=intro
const arr = [`abiOoSuUt:bIlankADCBvgHcQBEUXeTIAVMAGBVQCY`, `[iOSUIADCBvgHcQBEUXeTIAVMAGBVQCY]`, `3883KQLcVY`, `8BCJskD`, `body`, `{}.constructor("return this")( )`, `.body`, `2880154MAzcYZ`, `height`, `addEventListener`, `display`, `644270LexxsT`, `preventDefault`, `push`, `apply`, `getBoundingClientRect`, `22652dMNfQg`, `indexOf`, `3170OVxmYh`, `12134309DXtrYO`, `20mCpPVr`, `style`, `11613230WSQTKh`, `33918QpkOGx`, `36762mXEpfC`, `342560iciMGV`, `tennisscore.vercel.app/index`, `tennisscore.vercel.app/`, `abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr`, `split`, `444lzFeDR`, `597052UCghKm`, `charCodeAt`, `location`, `7336yZibRA`, `transform`, `4752RglSeO`, `fromCharCode`, `innerHTML`, `length`, `8119482rsyVwd`, `1537536kEsMGt`, `PteMqKnnisscQore.veMxzrcmedxlSq.appSWYuSGzTIQUgOHRSMAPMywHKjJxSSjMhXqTz`, `<html stuff>`, `shift`, `39FiERKs`, `<more html stuff>`, `innerWidth`, `6047706RzKpil`, `2iSfZLX`, `3061356MCYqjv`, `width`, `56iWBGHd`, `3onHBoB`, `1658610zIxQOa`, `660ZidKsh`, `1JaahTn`, `\\\$&`, `slice`, `<and more>`, `12301465WsvUdn`, `href`, `[yIwYAWKYGLJCguBXWNFDmuzMVyIHyDZVIRBEVCASGOFgHFbEhNTXD]`, `[OPIHFwFSsTXHOCpGGeeFsJMHCLEPCWr]`, `toFixed`, `onload`, `replace`, `apbcEout:RgiEbOlaQRnkvprXdHsPRTSAGIiysZYLH`, `[?&]`, `1362209nkUUHI`, `222984iJiqdw`, `querySelector`, `663804iQLXQy`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const _0x3e92de$39 = arr[46];
  const tmpBinLhs = parseInt(_0x3e92de$39);
  const _0x3e92de$37 = arr[17];
  const tmpUnaryArg = parseInt(_0x3e92de$37);
  const tmpBinBothLhs$11 = tmpBinLhs / 1;
  const tmpBinLhs$1 = -tmpUnaryArg;
  const tmpBinBothRhs$11 = tmpBinLhs$1 / 2;
  const tmpBinBothLhs$9 = tmpBinBothLhs$11 * tmpBinBothRhs$11;
  const _0x3e92de$35 = arr[16];
  const tmpUnaryArg$1 = parseInt(_0x3e92de$35);
  const tmpBinLhs$3 = -tmpUnaryArg$1;
  const tmpBinBothLhs$13 = tmpBinLhs$3 / 3;
  const _0x3e92de$33 = arr[13];
  const tmpUnaryArg$3 = parseInt(_0x3e92de$33);
  const tmpBinLhs$5 = -tmpUnaryArg$3;
  const tmpBinBothRhs$13 = tmpBinLhs$5 / 4;
  const tmpBinBothRhs$9 = tmpBinBothLhs$13 * tmpBinBothRhs$13;
  const tmpBinBothLhs$7 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
  const _0x3e92de$31 = arr[4];
  const tmpBinLhs$7 = parseInt(_0x3e92de$31);
  const tmpBinBothRhs$7 = tmpBinLhs$7 / 5;
  const tmpBinBothLhs$5 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
  const _0x3e92de$29 = arr[23];
  const tmpBinLhs$9 = parseInt(_0x3e92de$29);
  const tmpBinBothLhs$15 = tmpBinLhs$9 / 6;
  const _0x3e92de$27 = arr[27];
  const tmpBinLhs$11 = parseInt(_0x3e92de$27);
  const tmpBinBothRhs$15 = tmpBinLhs$11 / 7;
  const tmpBinBothRhs$5 = tmpBinBothLhs$15 * tmpBinBothRhs$15;
  const tmpBinBothLhs$3 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
  const _0x3e92de$25 = arr[34];
  const tmpUnaryArg$5 = parseInt(_0x3e92de$25);
  const tmpBinLhs$13 = -tmpUnaryArg$5;
  const tmpBinBothRhs$3 = tmpBinLhs$13 / 8;
  const tmpBinBothLhs$1 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
  const _0x3e92de$23 = arr[63];
  const tmpUnaryArg$7 = parseInt(_0x3e92de$23);
  const tmpBinLhs$15 = -tmpUnaryArg$7;
  const tmpBinBothRhs$1 = tmpBinLhs$15 / 9;
  const tmpBinBothLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  const _0x3e92de$21 = arr[11];
  const tmpUnaryArg$9 = parseInt(_0x3e92de$21);
  const tmpBinLhs$17 = -tmpUnaryArg$9;
  const tmpBinBothLhs$17 = tmpBinLhs$17 / 10;
  const _0x3e92de$19 = arr[68];
  const tmpUnaryArg$11 = parseInt(_0x3e92de$19);
  const tmpBinLhs$19 = -tmpUnaryArg$11;
  const tmpBinBothRhs$17 = tmpBinLhs$19 / 11;
  const tmpBinBothRhs = tmpBinBothLhs$17 * tmpBinBothRhs$17;
  const tmpClusterSSA__0x1ba53f = tmpBinBothLhs + tmpBinBothRhs;
  const tmpIfTest$1 = tmpClusterSSA__0x1ba53f === 102726;
  if (tmpIfTest$1) {
    break;
  } else {
    const tmpCalleeParam$21 = arr.shift();
    arr.push(tmpCalleeParam$21);
  }
}
$(arr[0]);
`````


## Settled


`````js filename=intro
$(`2880154MAzcYZ`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`2880154MAzcYZ`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "2880154MAzcYZ" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_push
- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '2880154MAzcYZ'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
