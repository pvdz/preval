# Preval test case

# world_all.md

> Lock this > World all
>
> This is from a real world case (all reducers)

## Options

Preval goes apeshit if you allow it
- unroll: 0
- loopProtectLimit: 100

## Input

`````js filename=intro
const three/*:(unknown)=>unknown*/ = function(_0x5163ed/*uses this*/) {
  let _0x51a65f/*:number*/ = 0;
  const tmpCompObj$3/*:unknown*/ = this.EX_PROP_A;
  let _0x4fe20b/*:unknown*/ = tmpCompObj$3.length;
  while (true) {
    const tmpIfTest$23/*:boolean*/ = _0x51a65f < _0x4fe20b;
    if (tmpIfTest$23) {
      const tmpMCOO$5/*:unknown*/ = this.EX_PROP_A;
      const tmpMCF$27/*:unknown*/ = tmpMCOO$5.push;
      const tmpMCP$19/*:number*/ = $Math_random();
      const tmpMCP$17/*:number*/ = $Math_round(tmpMCP$19);
      $dotCall(tmpMCF$27, tmpMCOO$5, `push`, tmpMCP$17);
      const tmpAssignRhsProp/*:unknown*/ = this.EX_PROP_A;
      _0x4fe20b = tmpAssignRhsProp.length;
      _0x51a65f = _0x51a65f + 1;
    } else {
      break;
    }
  }
  const tmpCompObj$5/*:unknown*/ = this.EX_PROP_A;
  const tmpCalleeParam$11/*:unknown*/ = tmpCompObj$5[0];
  const tmpReturnArg$9/*:unknown*/ = _0x5163ed(tmpCalleeParam$11);
  return tmpReturnArg$9;
};
const two/*:(unknown)=>unknown*/ = function(secretly_two/*uses this*/) {
  const tmpCalleeParam$9/*:number*/ = ~secretly_two;
  if (tmpCalleeParam$9) {
    const tmpMCF$25/*:unknown*/ = this.EX_PROP_K;
    const tmpMCP$15/*:unknown*/ = this.EX_PROP_H;
    const tmpReturnArg$7/*:unknown*/ = $dotCall(tmpMCF$25, this, `EX_PROP_K`, tmpMCP$15);
    return tmpReturnArg$7;
  } else {
    return secretly_two;
  }
};
const one/*:()=>unknown*/ = function(/*uses this*/) {
  const tmpBinBothLhs$109/*:unknown*/ = this.EX_PROP_D;
  const tmpBinBothRhs$109/*:unknown*/ = this.EX_PROP_E;
  const tmpCalleeParam$26/*:primitive*/ = tmpBinBothLhs$109 + tmpBinBothRhs$109;
  const _0x2c3587/*:regex*/ /*truthy*/ = new $regex_constructor(tmpCalleeParam$26);
  const tmpMCOO$3/*:unknown*/ = this.EX_PROP_B;
  const tmpMCF$21/*:unknown*/ = tmpMCOO$3.toString;
  const tmpMCP$13/*:unknown*/ = $dotCall(tmpMCF$21, tmpMCOO$3, `toString`);
  $dotCall($regex_test, _0x2c3587, `test`, tmpMCP$13);
  const tmpUpdObj/*:unknown*/ = this.EX_PROP_A;
  const tmpUpdVal/*:unknown*/ = tmpUpdObj[1];
  const tmpUpdNum/*:number*/ = $coerce(tmpUpdVal, `number`);
  const tmpUpdInc/*:number*/ = tmpUpdNum - 1;
  tmpUpdObj[1] = tmpUpdInc;
  const tmpMCF$23/*:unknown*/ = this.EX_PROP_C;
  const tmpReturnArg$5/*:unknown*/ = $dotCall(tmpMCF$23, this, `EX_PROP_C`, tmpUpdInc);
  return tmpReturnArg$5;
};
const A/*:(unknown)=>undefined*/ = function(secretly_one/*uses this*/) {
  this.EX_PROP_H = secretly_one;
  const arr/*:array*/ /*truthy*/ = [1, 0, 0];
  this.EX_PROP_A = arr;
  this.EX_PROP_B = two;
  this.EX_PROP_D = `\\w+ *\\(\\) *{\\w+ *`;
  this.EX_PROP_E = `['|"].+['|"];? *}`;
  return undefined;
};
const main/*:(unknown, unknown)=>unknown*/ = function(a, b/*uses arguments*/) {
  if ($(false)) { // snipped
    return undefined;
  } else {
    const tmpBinLhs$55/*:unknown*/ = main.EX_PROP_G;
    const tmpIfTest$17/*:boolean*/ = tmpBinLhs$55 === undefined;
    if (tmpIfTest$17) {
      const tmpAssignMemLhsObj$7/*:unknown*/ = A.prototype;
      tmpAssignMemLhsObj$7.EX_PROP_F = one;
      const tmpAssignMemLhsObj$11/*:unknown*/ = A.prototype;
      tmpAssignMemLhsObj$11.EX_PROP_C = two;
      const tmpAssignMemLhsObj$15/*:unknown*/ = A.prototype;
      tmpAssignMemLhsObj$15.EX_PROP_K = three;
      const tmpMCOO$7/*:object*/ /*truthy*/ = new A(main);
      const tmpMCF$33/*:unknown*/ = tmpMCOO$7.EX_PROP_F;
      const ret = $dotCall(tmpMCF$33, tmpMCOO$7, `EX_PROP_F`);
      main.EX_PROP_G = true;
      return ret;
    } else {

    }
    return undefined;
  }
};
$(main(123, 'abc'));
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  $(undefined);
} else {
  $(-1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  $(undefined);
} else {
  $(-1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( undefined );
}
else {
  $( -1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const three = function ($$0) {
  const tmpPrevalAliasThis = this;
  let _0x5163ed = $$0;
  debugger;
  let _0x51a65f = 0;
  const tmpCompObj$3 = tmpPrevalAliasThis.EX_PROP_A;
  let _0x4fe20b = tmpCompObj$3.length;
  while (true) {
    const tmpIfTest$23 = _0x51a65f < _0x4fe20b;
    if (tmpIfTest$23) {
      const tmpMCOO$5 = tmpPrevalAliasThis.EX_PROP_A;
      const tmpMCF$27 = tmpMCOO$5.push;
      const tmpMCP$19 = $Math_random();
      const tmpMCP$17 = $Math_round(tmpMCP$19);
      $dotCall(tmpMCF$27, tmpMCOO$5, `push`, tmpMCP$17);
      const tmpAssignRhsProp = tmpPrevalAliasThis.EX_PROP_A;
      _0x4fe20b = tmpAssignRhsProp.length;
      _0x51a65f = _0x51a65f + 1;
    } else {
      break;
    }
  }
  const tmpCompObj$5 = tmpPrevalAliasThis.EX_PROP_A;
  const tmpCalleeParam$11 = tmpCompObj$5[0];
  const tmpReturnArg$9 = _0x5163ed(tmpCalleeParam$11);
  return tmpReturnArg$9;
};
const two = function ($$0) {
  const tmpPrevalAliasThis$1 = this;
  let secretly_two = $$0;
  debugger;
  const tmpCalleeParam$9 = ~secretly_two;
  if (tmpCalleeParam$9) {
    const tmpMCF$25 = tmpPrevalAliasThis$1.EX_PROP_K;
    const tmpMCP$15 = tmpPrevalAliasThis$1.EX_PROP_H;
    const tmpReturnArg$7 = $dotCall(tmpMCF$25, tmpPrevalAliasThis$1, `EX_PROP_K`, tmpMCP$15);
    return tmpReturnArg$7;
  } else {
    return secretly_two;
  }
};
const one = function () {
  const tmpPrevalAliasThis$3 = this;
  debugger;
  const tmpBinBothLhs$109 = tmpPrevalAliasThis$3.EX_PROP_D;
  const tmpBinBothRhs$109 = tmpPrevalAliasThis$3.EX_PROP_E;
  const tmpCalleeParam$26 = tmpBinBothLhs$109 + tmpBinBothRhs$109;
  const _0x2c3587 = new $regex_constructor(tmpCalleeParam$26);
  const tmpMCOO$3 = tmpPrevalAliasThis$3.EX_PROP_B;
  const tmpMCF$21 = tmpMCOO$3.toString;
  const tmpMCP$13 = $dotCall(tmpMCF$21, tmpMCOO$3, `toString`);
  $dotCall($regex_test, _0x2c3587, `test`, tmpMCP$13);
  const tmpUpdObj = tmpPrevalAliasThis$3.EX_PROP_A;
  const tmpUpdVal = tmpUpdObj[1];
  const tmpUpdNum = $coerce(tmpUpdVal, `number`);
  const tmpUpdInc = tmpUpdNum - 1;
  tmpUpdObj[1] = tmpUpdInc;
  const tmpMCF$23 = tmpPrevalAliasThis$3.EX_PROP_C;
  const tmpReturnArg$5 = $dotCall(tmpMCF$23, tmpPrevalAliasThis$3, `EX_PROP_C`, tmpUpdInc);
  return tmpReturnArg$5;
};
const A = function ($$0) {
  const tmpPrevalAliasThis$5 = this;
  let secretly_one = $$0;
  debugger;
  tmpPrevalAliasThis$5.EX_PROP_H = secretly_one;
  const arr = [1, 0, 0];
  tmpPrevalAliasThis$5.EX_PROP_A = arr;
  tmpPrevalAliasThis$5.EX_PROP_B = two;
  tmpPrevalAliasThis$5.EX_PROP_D = `\\w+ *\\(\\) *{\\w+ *`;
  tmpPrevalAliasThis$5.EX_PROP_E = `['|"].+['|"];? *}`;
  return undefined;
};
const main = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpBinLhs$55 = main.EX_PROP_G;
    const tmpIfTest$17 = tmpBinLhs$55 === undefined;
    if (tmpIfTest$17) {
      const tmpAssignMemLhsObj$7 = A.prototype;
      tmpAssignMemLhsObj$7.EX_PROP_F = one;
      const tmpAssignMemLhsObj$11 = A.prototype;
      tmpAssignMemLhsObj$11.EX_PROP_C = two;
      const tmpAssignMemLhsObj$15 = A.prototype;
      tmpAssignMemLhsObj$15.EX_PROP_K = three;
      const tmpMCOO$7 = new A(main);
      const tmpMCF$33 = tmpMCOO$7.EX_PROP_F;
      const ret = $dotCall(tmpMCF$33, tmpMCOO$7, `EX_PROP_F`);
      main.EX_PROP_G = true;
      return ret;
    } else {
      return undefined;
    }
  }
};
let tmpCalleeParam = main(123, `abc`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Support this ident in isFree CallExpression: $Math_random
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) access object property that also exists on prototype? $function_toString
- (todo) regular property access of an ident feels tricky;
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $Math_random
- (todo) type trackeed tricks can possibly support static $Math_round


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
