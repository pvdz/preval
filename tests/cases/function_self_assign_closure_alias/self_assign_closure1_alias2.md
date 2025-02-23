# Preval test case

# self_assign_closure1_alias2.md

> Function self assign closure alias > Self assign closure1 alias2
>
> See self_assign_closure rule
> This is the case where the function is also aliased

## Input

`````js filename=intro
let a = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
let b = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
// Since b() always returns a fresh reference, `a() !== b()` even though `b() === a()`
$(a() === b());
$(a() === b());
// Swapped, even now, will be equal, since b() updates the reference for a()
$(b() === a());
// But it does so every time so a still not b here
$(a() === b());
`````

## Pre Normal


`````js filename=intro
let a = function () {
  debugger;
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  return a();
};
let b = function () {
  debugger;
  const arr$1 = [1, 2, 3];
  a = function () {
    debugger;
    return arr$1;
  };
  return a();
};
$(a() === b());
$(a() === b());
$(b() === a());
$(a() === b());
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
let b = function () {
  debugger;
  const arr$1 = [1, 2, 3];
  a = function () {
    debugger;
    return arr$1;
  };
  const tmpReturnArg$1 = a();
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpBinBothLhs = a();
const tmpBinBothRhs = b();
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpBinBothLhs$1 = a();
const tmpBinBothRhs$1 = b();
const tmpCalleeParam$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpBinBothLhs$3 = b();
const tmpBinBothRhs$3 = a();
const tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpBinBothLhs$5 = a();
const tmpBinBothRhs$5 = b();
const tmpCalleeParam$5 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
let a /*:()=>*/ = function () {
  debugger;
  const arr /*:array*/ = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg /*:unknown*/ = a();
  return tmpReturnArg;
};
const b /*:()=>?*/ = function () {
  debugger;
  const arr$1 /*:array*/ = [1, 2, 3];
  a = function () {
    debugger;
    return arr$1;
  };
  const tmpReturnArg$1 /*:unknown*/ = a();
  return tmpReturnArg$1;
};
const tmpBinBothLhs /*:unknown*/ = a();
const tmpBinBothRhs /*:unknown*/ = b();
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 /*:unknown*/ = a();
const tmpBinBothRhs$1 /*:unknown*/ = b();
const tmpCalleeParam$1 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 /*:unknown*/ = b();
const tmpBinBothRhs$3 /*:unknown*/ = a();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
const tmpBinBothLhs$5 /*:unknown*/ = a();
const tmpBinBothRhs$5 /*:unknown*/ = b();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = function() {
  debugger;
  const e = [ 1, 2, 3 ];
  a = function() {
    debugger;
    return e;
  };
  const f = a();
  return f;
};
const g = a();
const h = d();
const i = g === h;
$( i );
const j = a();
const k = d();
const l = j === k;
$( l );
const m = d();
const n = a();
const o = m === n;
$( o );
const p = a();
const q = d();
const r = p === q;
$( r );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: false
 - 3: true
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
