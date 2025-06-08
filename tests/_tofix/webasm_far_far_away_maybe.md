# Preval test case

# webasm_far_far_away_maybe.md

> Tofix > webasm far far away maybe
>
> webassembly bootstrap js1k: https://wasmgroundup.com/blog/wasm-compiler-in-a-tweet/
> won't be unraveling this for a long time
> it will involve applying a .flatmap and uint8array stuff
>

## Input

`````js filename=intro
// What happens to the split there?
let c=(b,l)=>WebAssembly.instantiate(new Int8Array(
[,97,115,109,1,,,,1,5,1,96,,1,127,3,2,1,,7,4,1,,,,10,
l=(b=b.split` `.flatMap(t=>t>-1?[65,t]:107+'-*/'.indexOf(t)))
.length+4,1,l-2,,...b,11]))
// usage
(/*await*/ c('11 11 1 - + 4 * 2 /')).instance.exports['']()
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = function ($$0, $$1) {
  let b = $$0;
  let l = $$1;
  debugger;
  const tmpMCF = WebAssembly.instantiate;
  const tmpNewCallee = Int8Array;
  const tmpArrElement = 97;
  const tmpArrElement$1 = 115;
  const tmpArrElement$3 = 109;
  const tmpArrElement$5 = 1;
  const tmpArrElement$7 = 1;
  const tmpArrElement$9 = 5;
  const tmpArrElement$11 = 1;
  const tmpArrElement$13 = 96;
  const tmpArrElement$15 = 1;
  const tmpArrElement$17 = 127;
  const tmpArrElement$19 = 3;
  const tmpArrElement$21 = 2;
  const tmpArrElement$23 = 1;
  const tmpArrElement$25 = 7;
  const tmpArrElement$27 = 4;
  const tmpArrElement$29 = 1;
  const tmpArrElement$31 = 10;
  const tmpMCF$1 = b.split;
  const tmpMCP$1 = [` `];
  const tmpMCOO$1 = $dotCall(tmpMCF$1, b, `split`, tmpMCP$1);
  const tmpMCF$3 = tmpMCOO$1.flatMap;
  const tmpMCP$3 = function ($$0) {
    let t = $$0;
    debugger;
    let tmpReturnArg$1 = undefined;
    const tmpIfTest = t > -1;
    if (tmpIfTest) {
      tmpReturnArg$1 = [65, t];
      return tmpReturnArg$1;
    } else {
      const tmpBinBothLhs = 107;
      const tmpMCF$5 = $string_indexOf;
      const tmpBinBothRhs = $dotCall($string_indexOf, `-*/`, `indexOf`, t);
      tmpReturnArg$1 = tmpBinBothLhs + tmpBinBothRhs;
      return tmpReturnArg$1;
    }
  };
  b = $dotCall(tmpMCF$3, tmpMCOO$1, `flatMap`, tmpMCP$3);
  const tmpCompObj$3 = b;
  const tmpBinLhs = tmpCompObj$3.length;
  l = tmpBinLhs + 4;
  const tmpArrElement$33 = l;
  const tmpArrElement$35 = 1;
  const tmpArrElement$37 = l - 2;
  let tmpCalleeParam = [
    ,
    tmpArrElement,
    tmpArrElement$1,
    tmpArrElement$3,
    tmpArrElement$5,
    ,
    ,
    ,
    tmpArrElement$7,
    tmpArrElement$9,
    tmpArrElement$11,
    tmpArrElement$13,
    ,
    tmpArrElement$15,
    tmpArrElement$17,
    tmpArrElement$19,
    tmpArrElement$21,
    tmpArrElement$23,
    ,
    tmpArrElement$25,
    tmpArrElement$27,
    tmpArrElement$29,
    ,
    ,
    ,
    tmpArrElement$31,
    tmpArrElement$33,
    tmpArrElement$35,
    tmpArrElement$37,
    ,
    ...b,
    11,
  ];
  const tmpMCP = new tmpNewCallee(tmpCalleeParam);
  const tmpCallComplexCallee = $dotCall(tmpMCF, WebAssembly, `instantiate`, tmpMCP);
  const tmpCallCallee = tmpCallComplexCallee;
  let tmpCalleeParam$1 = c(`11 11 1 - + 4 * 2 /`);
  const tmpCompObj$1 = tmpCallComplexCallee(tmpCalleeParam$1);
  const tmpCompObj = tmpCompObj$1.instance;
  const tmpMCOO = tmpCompObj.exports;
  const tmpMCF$7 = tmpMCOO[``];
  const tmpReturnArg = $dotCall(tmpMCF$7, tmpMCOO, undefined);
  return tmpReturnArg;
};
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
