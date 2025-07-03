# Preval test case

# more_noise.md

> Self assign > Closure > More noise
>
>

## Options

- unroll=0

## Input

`````js filename=intro
const tmpFree$1/*:(unused, unused, unused, unused, unused, unused, unused, unused, unused)=>boolean*/ = function $free(tmpUnaryArg$4/*:number*/, tmpUnaryArg$1/*:number*/, tmpBinLhs$2/*:number*/, tmpUnaryArg$8/*:number*/, tmpBinLhs$4/*:number*/, tmpUnaryArg$10/*:number*/, tmpUnaryArg$14/*:number*/, tmpBinLhs$11/*:number*/, tmpBinLhs$24/*:number*/) {
  const tmpBinLhs$26/*:number*/ = -tmpUnaryArg$4;
  const tmpBinLhs$25/*:number*/ = -tmpUnaryArg$1;
  const tmpBinBothLhs$6/*:number*/ = tmpBinLhs$26 / 2;
  const tmpBinBothRhs$8/*:number*/ = tmpBinLhs$2 / 3;
  const tmpBinBothLhs$8/*:number*/ = tmpBinLhs$25 / 1;
  const tmpBinBothRhs$6/*:number*/ = tmpBinBothLhs$6 * tmpBinBothRhs$8;
  const tmpBinLhs$22/*:number*/ = -tmpUnaryArg$8;
  const tmpBinBothLhs$1/*:number*/ = (tmpBinBothLhs$8 + tmpBinBothRhs$6) + (tmpBinLhs$22 / 4);
  const tmpBinBothRhs$4/*:number*/ = tmpBinLhs$4 / 5;
  const tmpBinLhs$18/*:number*/ = -tmpUnaryArg$10;
  const tmpBinBothLhs$2/*:number*/ = tmpBinBothLhs$1 + tmpBinBothRhs$4;
  const tmpBinBothRhs$1/*:number*/ = tmpBinLhs$18 / 6;
  const tmpBinLhs$16/*:number*/ = -tmpUnaryArg$14;
  const tmpBinBothLhs$4/*:number*/ = tmpBinBothLhs$2 + tmpBinBothRhs$1;
  const tmpBinBothRhs$2/*:number*/ = tmpBinLhs$16 / 7;
  const tmpBinBothLhs$13/*:number*/ = tmpBinLhs$11 / 8;
  const tmpBinBothRhs$13/*:number*/ = tmpBinLhs$24 / 9;
  const tmpBinBothLhs/*:number*/ = tmpBinBothLhs$4 + tmpBinBothRhs$2;
  const tmpRet/*:boolean*/ = (tmpBinBothLhs + (tmpBinBothLhs$13 * tmpBinBothRhs$13)) === 141728;
  return tmpRet;
};
let vault/*:()=>unknown*/ = function() {
  const _0x47f531/*:array*/ /*truthy*/ = [`1789886cponBQ`, `78510ISLnvB`, `9549bxRPrD`, `370940qJliWS`, `./src/policy/policy.js`, `search`, `An error occurred whilst generating the policy`, `(((.+)+)+)+\$`, `./src/cmd/cmd.js`, `819465UqCMJN`, `10sEhiCG`, `toString`, `./src/parser/parser.js`, `5888gDJbon`, `192238yhCesM`, `789240QxDNPN`, `apply`];
  vault = function() {
    return _0x47f531;
  };
  const tmpReturnArg/*:unknown*/ = vault();
  return tmpReturnArg;
};
let unlocker/*:(unused, unused)=>unknown*/ = function(_0x5c061e, _0xeb9690) {
  const _0x5b258b/*:unknown*/ = vault();
  unlocker = function(_0x83332b, $$1) {
    const tmpSSA__0x83332b/*:number*/ = _0x83332b - 139;
    const _0x1f0938/*:unknown*/ = _0x5b258b[tmpSSA__0x83332b];
    return _0x1f0938;
  };
  const tmpReturnArg$1/*:unknown*/ = unlocker(_0x5c061e, _0xeb9690);
  return tmpReturnArg$1;
};
const fake_lock/*:function*/ /*truthy*/ = unlocker;
const da_vailt/*:function*/ /*truthy*/ = vault;
const fake_lock2/*:function*/ /*truthy*/ = unlocker;
const _0x279f54/*:unknown*/ = da_vailt();
while (true) {
  try {
    const tmpUnaryArg$5/*:number*/ = $Number_parseInt(fake_lock2(139));
    if (
      $frfr(
        tmpFree$1,
        $Number_parseInt(fake_lock2(152)), 
        tmpUnaryArg$5, 
        $Number_parseInt(fake_lock2(143)),
        $Number_parseInt(fake_lock2(145)),
        $Number_parseInt(fake_lock2(151)),
        $Number_parseInt(fake_lock2(140)),
        $Number_parseInt(fake_lock2(142)),
        $Number_parseInt(fake_lock2(155)),
        $Number_parseInt(fake_lock2(144))
      )
    ) {
      break;
    } else {
      _0x279f54.push(_0x279f54.shift());
    }
  } catch (_0x36ef3b) {
    _0x279f54.push(_0x279f54.shift());
  }
}
const Cmd/*:unknown*/ = require(fake_lock(150)).Cmd;
$(Cmd);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = require(`./src/cmd/cmd.js`);
const Cmd /*:unknown*/ = tmpCompObj.Cmd;
$(Cmd);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(require(`./src/cmd/cmd.js`).Cmd);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = require( "./src/cmd/cmd.js" );
const b = a.Cmd;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree$1 = function $free($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
  let tmpUnaryArg$4 = $$0;
  let tmpUnaryArg$1 = $$1;
  let tmpBinLhs$2 = $$2;
  let tmpUnaryArg$8 = $$3;
  let tmpBinLhs$4 = $$4;
  let tmpUnaryArg$10 = $$5;
  let tmpUnaryArg$14 = $$6;
  let tmpBinLhs$11 = $$7;
  let tmpBinLhs$24 = $$8;
  debugger;
  const tmpBinLhs$26 = -tmpUnaryArg$4;
  const tmpBinLhs$25 = -tmpUnaryArg$1;
  const tmpBinBothLhs$6 = tmpBinLhs$26 / 2;
  const tmpBinBothRhs$8 = tmpBinLhs$2 / 3;
  const tmpBinBothLhs$8 = tmpBinLhs$25 / 1;
  const tmpBinBothRhs$6 = tmpBinBothLhs$6 * tmpBinBothRhs$8;
  const tmpBinLhs$22 = -tmpUnaryArg$8;
  const tmpBinBothLhs$3 = tmpBinBothLhs$8 + tmpBinBothRhs$6;
  const tmpBinBothRhs = tmpBinLhs$22 / 4;
  const tmpBinBothLhs$1 = tmpBinBothLhs$3 + tmpBinBothRhs;
  const tmpBinBothRhs$4 = tmpBinLhs$4 / 5;
  const tmpBinLhs$18 = -tmpUnaryArg$10;
  const tmpBinBothLhs$2 = tmpBinBothLhs$1 + tmpBinBothRhs$4;
  const tmpBinBothRhs$1 = tmpBinLhs$18 / 6;
  const tmpBinLhs$16 = -tmpUnaryArg$14;
  const tmpBinBothLhs$4 = tmpBinBothLhs$2 + tmpBinBothRhs$1;
  const tmpBinBothRhs$2 = tmpBinLhs$16 / 7;
  const tmpBinBothLhs$13 = tmpBinLhs$11 / 8;
  const tmpBinBothRhs$13 = tmpBinLhs$24 / 9;
  const tmpBinBothLhs = tmpBinBothLhs$4 + tmpBinBothRhs$2;
  const tmpBinBothLhs$5 = tmpBinBothLhs;
  const tmpBinBothRhs$3 = tmpBinBothLhs$13 * tmpBinBothRhs$13;
  const tmpBinLhs = tmpBinBothLhs$5 + tmpBinBothRhs$3;
  const tmpRet = tmpBinLhs === 141728;
  return tmpRet;
};
let vault = function () {
  debugger;
  const _0x47f531 = [
    `1789886cponBQ`,
    `78510ISLnvB`,
    `9549bxRPrD`,
    `370940qJliWS`,
    `./src/policy/policy.js`,
    `search`,
    `An error occurred whilst generating the policy`,
    `(((.+)+)+)+\$`,
    `./src/cmd/cmd.js`,
    `819465UqCMJN`,
    `10sEhiCG`,
    `toString`,
    `./src/parser/parser.js`,
    `5888gDJbon`,
    `192238yhCesM`,
    `789240QxDNPN`,
    `apply`,
  ];
  vault = function () {
    debugger;
    return _0x47f531;
  };
  const tmpReturnArg = vault();
  return tmpReturnArg;
};
let unlocker = function ($$0, $$1) {
  let _0x5c061e = $$0;
  let _0xeb9690 = $$1;
  debugger;
  const _0x5b258b = vault();
  unlocker = function ($$0, $$1) {
    let _0x83332b = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    const tmpSSA__0x83332b = _0x83332b - 139;
    const _0x1f0938 = _0x5b258b[tmpSSA__0x83332b];
    return _0x1f0938;
  };
  const tmpReturnArg$1 = unlocker(_0x5c061e, _0xeb9690);
  return tmpReturnArg$1;
};
const fake_lock = unlocker;
const da_vailt = vault;
const fake_lock2 = unlocker;
const _0x279f54 = da_vailt();
while (true) {
  try {
    let tmpCalleeParam = fake_lock2(139);
    const tmpUnaryArg$5 = $Number_parseInt(tmpCalleeParam);
    let tmpCalleeParam$1 = tmpFree$1;
    let tmpCalleeParam$21 = fake_lock2(152);
    let tmpCalleeParam$3 = $Number_parseInt(tmpCalleeParam$21);
    let tmpCalleeParam$5 = tmpUnaryArg$5;
    let tmpCalleeParam$23 = fake_lock2(143);
    let tmpCalleeParam$7 = $Number_parseInt(tmpCalleeParam$23);
    let tmpCalleeParam$25 = fake_lock2(145);
    let tmpCalleeParam$9 = $Number_parseInt(tmpCalleeParam$25);
    let tmpCalleeParam$27 = fake_lock2(151);
    let tmpCalleeParam$11 = $Number_parseInt(tmpCalleeParam$27);
    let tmpCalleeParam$29 = fake_lock2(140);
    let tmpCalleeParam$13 = $Number_parseInt(tmpCalleeParam$29);
    let tmpCalleeParam$31 = fake_lock2(142);
    let tmpCalleeParam$15 = $Number_parseInt(tmpCalleeParam$31);
    let tmpCalleeParam$33 = fake_lock2(155);
    let tmpCalleeParam$17 = $Number_parseInt(tmpCalleeParam$33);
    let tmpCalleeParam$35 = fake_lock2(144);
    let tmpCalleeParam$19 = $Number_parseInt(tmpCalleeParam$35);
    const tmpIfTest = $frfr(
      tmpFree$1,
      tmpCalleeParam$3,
      tmpCalleeParam$5,
      tmpCalleeParam$7,
      tmpCalleeParam$9,
      tmpCalleeParam$11,
      tmpCalleeParam$13,
      tmpCalleeParam$15,
      tmpCalleeParam$17,
      tmpCalleeParam$19,
    );
    if (tmpIfTest) {
      break;
    } else {
      const tmpMCF = _0x279f54.push;
      const tmpMCF$1 = _0x279f54.shift;
      const tmpMCP = $dotCall(tmpMCF$1, _0x279f54, `shift`);
      $dotCall(tmpMCF, _0x279f54, `push`, tmpMCP);
    }
  } catch (_0x36ef3b) {
    const tmpMCF$3 = _0x279f54.push;
    const tmpMCF$5 = _0x279f54.shift;
    const tmpMCP$1 = $dotCall(tmpMCF$5, _0x279f54, `shift`);
    $dotCall(tmpMCF$3, _0x279f54, `push`, tmpMCP$1);
  }
}
let tmpCalleeParam$37 = fake_lock(150);
const tmpCompObj = require(tmpCalleeParam$37);
const Cmd = tmpCompObj.Cmd;
$(Cmd);
`````


## Todos triggered


- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) ReturnStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) VarStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) free with zero args, we can eliminate this?
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
